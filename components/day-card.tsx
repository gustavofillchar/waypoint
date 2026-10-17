import type { CityId, Day } from "@/lib/trip";
import { LinkChip } from "./link-chip";

const flags: Record<CityId, string> = {
  paris: "🇫🇷",
  london: "🇬🇧",
  lisbon: "🇵🇹",
  brazil: "🇧🇷",
};

export function DayCard({ day, chapterCity }: { day: Day; chapterCity: CityId }) {
  const accentCity = day.cities.includes("brazil") ? "brazil" : chapterCity;
  const isTravel = day.cities.length > 1;

  return (
    <article
      id={day.id}
      data-city={accentCity}
      className="day-anchor grid gap-x-10 gap-y-5 border-t border-line py-12 md:grid-cols-[10rem_1fr]"
    >
      <header className="md:sticky md:top-[calc(var(--strip-height)+1.5rem)] md:self-start">
        <div className="flex items-end gap-3 md:flex-col md:items-start md:gap-1">
          <p className="font-display text-7xl leading-[0.8] text-(--accent) md:text-8xl">
            {day.dayNumber}
          </p>
          <div className="pb-1 md:pb-0">
            <p className="font-mono text-xs tracking-[0.14em] whitespace-nowrap text-mist uppercase">
              {day.weekday}
            </p>
            {isTravel && (
              <p className="mt-1 text-sm" aria-label="Dia de deslocamento">
                {day.cities.map((c) => flags[c]).join(" → ")}
              </p>
            )}
          </div>
        </div>
      </header>

      <div>
        <h3 className="font-display text-3xl leading-tight text-ink sm:text-4xl">{day.title}</h3>
        {day.goal && <p className="mt-2 max-w-2xl text-lg leading-relaxed text-mist">{day.goal}</p>}

        <ol className="mt-8">
          {day.stops.map((stop, i) => (
            <li key={`${stop.time}-${stop.title}`} className="grid grid-cols-[4.5rem_1fr] gap-x-4 sm:grid-cols-[5.5rem_1fr]">
              <p className="pt-0.5 text-right font-mono text-sm font-medium text-(--accent) tabular-nums">
                {stop.time}
              </p>
              <div
                className={`relative border-l-2 pb-8 pl-6 ${
                  i === day.stops.length - 1 ? "border-transparent" : "border-(--accent)/20"
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute top-1.5 -left-[7px] size-3 rounded-full ring-4 ring-frost ${
                    stop.optional ? "border-2 border-dashed border-(--accent) bg-frost" : "bg-(--accent)"
                  }`}
                />
                <h4 className="flex flex-wrap items-center gap-2 text-lg leading-snug font-semibold text-ink">
                  {stop.title}
                  {stop.optional && (
                    <span className="rounded-full bg-(--accent-soft) px-2 py-0.5 font-mono text-[0.65rem] font-medium tracking-wider text-(--accent) uppercase">
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
                  <p className="mt-2 max-w-2xl border-l-2 border-(--accent-2) pl-3 text-sm leading-relaxed text-mist">
                    {stop.note}
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
          ))}
        </ol>

        {day.tip && (
          <p className="mt-2 rounded-2xl bg-(--accent-soft) px-5 py-4 leading-relaxed text-ink sm:ml-[calc(5.5rem+1rem)]">
            <span className="mr-2 font-mono text-xs font-medium tracking-[0.16em] text-(--accent) uppercase">
              Dica
            </span>
            {day.tip}
          </p>
        )}
      </div>
    </article>
  );
}
