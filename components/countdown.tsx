"use client";

import { ArrowIcon } from "./icons";
import { localDayId, useNow } from "./use-now";

type DayMeta = { id: string; title: string; place: string };

type Props = {
  departureISO: string;
  days: DayMeta[];
};

function plural(n: number, one: string, many: string) {
  return `${n} ${n === 1 ? one : many}`;
}

export function Countdown({ departureISO, days }: Props) {
  const now = useNow();
  const departure = Math.floor(new Date(departureISO).getTime() / 1000);

  if (now !== null && now >= departure) {
    const todayId = localDayId(now);
    const index = days.findIndex((d) => d.id === todayId);
    const today = days[index];

    if (!today) {
      return <p className="font-display text-2xl text-white sm:text-3xl">Viagem concluída. Até a próxima, Europa.</p>;
    }

    return (
      <a
        href={`#${today.id}`}
        className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      >
        <span className="text-white/70">
          Hoje, dia {index + 1} de {days.length} · {today.place}
        </span>
        <span className="mt-1 flex items-center gap-2 font-display text-2xl text-gold sm:text-3xl">
          {today.title}
          <ArrowIcon className="size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </a>
    );
  }

  const remaining = now === null ? null : departure - now;
  const daysLeft = remaining === null ? null : Math.floor(remaining / 86400);
  const hoursLeft = remaining === null ? null : Math.floor((remaining % 86400) / 3600);

  return (
    <div>
      <p className="font-display text-3xl text-gold sm:text-4xl" role="timer" aria-live="off">
        {daysLeft === null || hoursLeft === null ? (
          <span className="opacity-0">Faltam 00 dias</span>
        ) : daysLeft > 0 ? (
          <>
            Faltam {plural(daysLeft, "dia", "dias")}
            <span className="text-white/60"> e {hoursLeft} h</span>
          </>
        ) : (
          <>Embarque em {plural(hoursLeft, "hora", "horas")}</>
        )}
      </p>
      <p className="mt-1 text-white/70">Embarque sexta, 18/12, às 20h40 em Guarulhos</p>
    </div>
  );
}
