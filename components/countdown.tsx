"use client";

import { ArrowIcon } from "./icons";
import { localDayId, useNow } from "./use-now";

type DayMeta = { id: string; title: string; place: string };

type Props = {
  departureISO: string;
  days: DayMeta[];
};

const units: { label: string; size: number; wrap?: number }[] = [
  { label: "dias", size: 86400 },
  { label: "horas", size: 3600, wrap: 24 },
  { label: "min", size: 60, wrap: 60 },
  { label: "seg", size: 1, wrap: 60 },
];

export function Countdown({ departureISO, days }: Props) {
  const now = useNow();
  const departure = Math.floor(new Date(departureISO).getTime() / 1000);

  if (now !== null && now >= departure) {
    const todayId = localDayId(now);
    const index = days.findIndex((d) => d.id === todayId);
    const today = days[index];

    if (!today) {
      return (
        <p className="font-display text-2xl text-white sm:text-3xl">
          Viagem concluída. Até a próxima, Europa.
        </p>
      );
    }

    return (
      <a
        href={`#${today.id}`}
        className="group inline-flex flex-col gap-1 rounded-2xl border border-white/20 bg-white/5 px-5 py-4 text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      >
        <span className="font-mono text-xs tracking-[0.2em] text-gold uppercase">
          Hoje · dia {index + 1} de {days.length} · {today.place}
        </span>
        <span className="flex items-center gap-2 font-display text-2xl sm:text-3xl">
          {today.title}
          <ArrowIcon className="size-6 transition group-hover:translate-x-1" />
        </span>
      </a>
    );
  }

  const remaining = now === null ? null : departure - now;

  return (
    <div>
      <p className="mb-3 font-mono text-xs tracking-[0.2em] text-white/60 uppercase">
        Embarque em Guarulhos em
      </p>
      <div className="flex gap-2 sm:gap-3" role="timer" aria-live="off">
        {units.map((unit) => {
          const value =
            remaining === null ? null : Math.floor(remaining / unit.size) % (unit.wrap ?? Infinity);
          return (
            <div
              key={unit.label}
              className="flex min-w-[4.25rem] flex-col items-center rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2.5 sm:min-w-[5.5rem]"
            >
              <span className="font-display text-3xl text-white tabular-nums sm:text-5xl">
                {value === null ? "··" : String(value).padStart(2, "0")}
              </span>
              <span className="font-mono text-[0.65rem] tracking-[0.18em] text-white/55 uppercase">
                {unit.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
