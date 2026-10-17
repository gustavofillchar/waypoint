import type { CityId, Leg } from "@/lib/trip";
import { PlaneIcon, TrainIcon } from "./icons";

const cityColor: Record<CityId, string> = {
  paris: "var(--color-paris)",
  london: "var(--color-london)",
  lisbon: "var(--color-lisbon)",
  brazil: "var(--color-brazil)",
};

function Ticket({ leg }: { leg: Leg }) {
  const Icon = leg.mode === "train" ? TrainIcon : PlaneIcon;
  const [a, b] = leg.cities;

  return (
    <li className="flex w-[19rem] shrink-0 snap-start overflow-hidden rounded-2xl bg-white shadow-[0_1px_0_var(--color-line),0_12px_30px_-18px_rgb(14_24_48/0.4)] sm:w-auto">
      <div
        className="flex w-14 flex-col items-center justify-between py-4 text-white"
        style={{ background: `linear-gradient(180deg, ${cityColor[a]}, ${cityColor[b]})` }}
      >
        <Icon className="size-5" />
        <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase [writing-mode:vertical-rl] rotate-180">
          {leg.date}
        </span>
      </div>
      <div aria-hidden className="ticket-perf w-3" />
      <div className="flex-1 py-4 pr-5">
        <p className="font-mono text-[0.65rem] tracking-[0.18em] text-mist uppercase">{leg.carrier}</p>
        <div className="mt-2 flex items-start justify-between gap-2">
          <div>
            <p className="font-display text-4xl leading-none text-ink">{leg.from.code}</p>
            <p className="mt-1 font-mono text-sm font-medium whitespace-nowrap text-ink">{leg.from.time}</p>
          </div>
          <div aria-hidden className="mt-4 flex flex-1 items-center gap-1 text-mist">
            <span className="h-px flex-1 border-t border-dashed border-mist/50" />
            <Icon className="size-4" />
            <span className="h-px flex-1 border-t border-dashed border-mist/50" />
          </div>
          <div className="text-right">
            <p className="font-display text-4xl leading-none text-ink">{leg.to.code}</p>
            <p className="mt-1 font-mono text-sm font-medium whitespace-nowrap text-ink">{leg.to.time}</p>
          </div>
        </div>
        <p className="mt-2 flex justify-between gap-3 text-xs text-mist">
          <span>{leg.from.place}</span>
          <span className="text-right">{leg.to.place}</span>
        </p>
        <ul className="mt-3 space-y-0.5 border-t border-dashed border-line pt-3 text-[0.8rem] leading-snug text-ink/75">
          {leg.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function Tickets({ legs }: { legs: Leg[] }) {
  return (
    <ol className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 xl:grid-cols-4">
      {legs.map((leg) => (
        <Ticket key={leg.id} leg={leg} />
      ))}
    </ol>
  );
}
