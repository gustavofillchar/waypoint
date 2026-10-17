import type { Leg } from "@/lib/trip";
import { PlaneIcon, TrainIcon } from "./icons";

function Ticket({ leg }: { leg: Leg }) {
  const Icon = leg.mode === "train" ? TrainIcon : PlaneIcon;

  return (
    <li data-city={leg.cities[1]} className="rounded-2xl bg-white p-5">
      <p className="flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-ink">{leg.date}</span>
        <span className="flex items-center gap-1.5 text-mist">
          <Icon className="size-4 text-(--accent)" />
          {leg.carrier}
        </span>
      </p>

      <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-start gap-3">
        <div>
          <p className="font-mono text-2xl leading-none font-medium text-ink">{leg.from.code}</p>
          <p className="mt-1.5 font-mono text-sm text-ink tabular-nums">{leg.from.time}</p>
          <p className="mt-1 text-sm leading-snug text-mist">{leg.from.place}</p>
        </div>
        <div aria-hidden className="mt-2.5 flex w-10 items-center text-mist/60 sm:w-16">
          <span className="h-px flex-1 bg-current" />
          <span className="size-0 border-y-4 border-l-[6px] border-y-transparent border-l-current" />
        </div>
        <div className="text-right">
          <p className="font-mono text-2xl leading-none font-medium text-ink">{leg.to.code}</p>
          <p className="mt-1.5 font-mono text-sm text-ink tabular-nums">{leg.to.time}</p>
          <p className="mt-1 text-sm leading-snug text-mist">{leg.to.place}</p>
        </div>
      </div>

      <ul className="mt-4 space-y-1 border-t border-line pt-3 text-sm leading-snug text-ink/80">
        {leg.details.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
    </li>
  );
}

export function Tickets({ legs }: { legs: Leg[] }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {legs.map((leg) => (
        <Ticket key={leg.id} leg={leg} />
      ))}
    </ol>
  );
}
