import type { CityId, Day } from "@/lib/trip";
import { AlertIcon, PlaneIcon } from "./icons";
import { LinkChip } from "./link-chip";

const placeName: Record<CityId, string> = {
  paris: "Paris",
  london: "Londres",
  lisbon: "Lisboa",
  brazil: "Brasil",
};

export function DayCard({ day, chapterCity }: { day: Day; chapterCity: CityId }) {
  const accentCity = day.cities.includes("brazil") ? "brazil" : chapterCity;
  const isTravel = day.cities.length > 1;

  return (
    <article
      id={day.id}
      data-city={accentCity}
      aria-labelledby={`${day.id}-title`}
      className="day-anchor grid gap-x-10 gap-y-4 border-t border-line py-10 sm:py-12 md:grid-cols-[9rem_1fr]"
    >
      <header className="flex items-center gap-4 md:sticky md:top-[calc(var(--strip-height)+1.5rem)] md:flex-col md:items-start md:gap-2 md:self-start">
        <p className="font-display text-5xl leading-[0.85] text-(--accent) tabular-nums md:text-7xl">{day.dayNumber}</p>
        <div className="text-sm leading-snug">
          <p className="text-ink">
            {day.weekday}
            <span className="text-mist"> · {day.date}</span>
          </p>
          {isTravel && (
            <p className="mt-0.5 flex items-center gap-1.5 text-mist">
              <PlaneIcon className="size-3.5 text-(--accent)" />
              {day.cities.map((c) => placeName[c]).join(" → ")}
            </p>
          )}
        </div>
      </header>

      <div className="min-w-0">
        <h3 id={`${day.id}-title`} className="font-display text-[1.75rem] leading-tight text-balance text-ink sm:text-4xl">
          {day.title}
        </h3>
        {day.goal && <p className="mt-2 max-w-2xl leading-relaxed text-mist sm:text-lg">{day.goal}</p>}

        <ol className="mt-7">
          {day.stops.map((stop, i) => {
            const last = i === day.stops.length - 1;
            return (
              <li key={`${stop.time}-${stop.title}`} className="grid grid-cols-[1fr] sm:grid-cols-[5.5rem_1fr] sm:gap-x-4">
                <p className="hidden pt-0.5 text-right font-mono text-sm font-medium text-(--accent) tabular-nums sm:block">
                  {stop.time}
                </p>
                <div className={`relative border-l-2 pb-7 pl-5 sm:pl-6 ${last ? "border-transparent" : "border-(--accent)/20"}`}>
                  <span
                    aria-hidden
                    className={`absolute top-1.5 -left-[7px] size-3 rounded-full ring-4 ring-frost ${
                      stop.optional ? "border-2 border-(--accent) bg-frost" : "bg-(--accent)"
                    }`}
                  />
                  <p className="font-mono text-sm font-medium text-(--accent) tabular-nums sm:hidden">{stop.time}</p>
                  <h4 className="flex flex-wrap items-center gap-x-2 gap-y-1 text-lg leading-snug font-semibold text-ink">
                    {stop.title}
                    {stop.optional && (
                      <span className="rounded-full bg-(--accent-soft) px-2 py-0.5 text-xs font-medium text-(--accent)">
                        opcional
                      </span>
                    )}
                  </h4>
                  {stop.text && <p className="mt-1 max-w-2xl leading-relaxed text-ink/80">{stop.text}</p>}
                  {stop.bullets && (
                    <ul className="mt-2 max-w-2xl space-y-1 text-ink/80">
                      {stop.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5 leading-relaxed">
                          <span aria-hidden className="mt-[0.6rem] size-1 shrink-0 rounded-full bg-(--accent)/60" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                  {stop.note && (
                    <p className="mt-2 flex max-w-2xl gap-2 text-sm leading-relaxed text-ink/80">
                      <AlertIcon className="mt-0.5 size-4 shrink-0 text-(--accent)" />
                      <span>{stop.note}</span>
                    </p>
                  )}
                  {stop.links && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {stop.links.map((link) => (
                        <LinkChip key={link.href + link.kind} link={link} />
                      ))}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        {day.tip && (
          <p className="rounded-xl bg-(--accent-soft) px-4 py-3 leading-relaxed text-ink sm:ml-[calc(5.5rem+1rem)]">
            <span className="font-semibold text-(--accent)">Dica: </span>
            {day.tip}
          </p>
        )}
      </div>
    </article>
  );
}
