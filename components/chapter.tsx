import { dayById, maps, type City } from "@/lib/trip";
import { ChecklistLink } from "./checklist-link";
import { CopyButton } from "./copy-button";
import { DayCard } from "./day-card";
import { ArrowIcon, PinIcon } from "./icons";

const bandClass: Record<City["id"], string> = {
  paris: "band-paris",
  london: "band-london",
  lisbon: "band-lisbon",
};

const taglineColor: Record<City["id"], string> = {
  paris: "text-gold",
  london: "text-white",
  lisbon: "text-tram",
};

export function Chapter({ city }: { city: City }) {
  const days = city.dayIds.map((id) => dayById[id]);
  const checklistIds = city.checklist.flatMap((g) => g.items.map((item) => `${city.id}:${item}`));

  return (
    <section id={city.id} data-city={city.id} aria-labelledby={`${city.id}-title`} className="day-anchor">
      <div className={`${bandClass[city.id]} text-white`}>
        <div className="mx-auto max-w-6xl px-5 pt-12 pb-8 sm:px-6 sm:pt-20 sm:pb-12">
          <p className="font-medium text-white/80 tabular-nums">{city.period}</p>
          <h2
            id={`${city.id}-title`}
            className="mt-2 font-display text-[3.5rem] leading-[0.9] tracking-[-0.015em] sm:text-7xl lg:text-8xl"
          >
            {city.name}
          </h2>
          <p className={`mt-3 font-display text-xl sm:text-2xl ${taglineColor[city.id]}`}>{city.tagline}</p>
          <p className="mt-5 max-w-2xl leading-relaxed text-white/85 sm:text-lg">{city.intro}</p>

          <div className="mt-8 flex flex-col gap-4 border-t border-white/20 pt-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <PinIcon className="mt-0.5 size-5 shrink-0 text-white/70" />
              <p className="leading-snug">
                <span className="block text-sm text-white/70">Hospedagem</span>
                {city.address}
              </p>
            </div>
            <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex">
              <a
                href={maps(city.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-white px-4 text-sm font-semibold text-(--accent) transition-colors duration-150 hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Abrir no Maps
                <ArrowIcon className="size-4" />
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
              <CopyButton
                text={city.address}
                className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-white/45 px-4 text-sm font-medium text-white transition-colors duration-150 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="py-4">
          <ChecklistLink cityId={city.id} cityName={city.name} ids={checklistIds} />
        </div>

        {days.map((day) => (
          <DayCard key={day.id} day={day} chapterCity={city.id} />
        ))}

        <div className="grid gap-10 border-t border-line py-12 lg:grid-cols-2 lg:gap-14">
          <div>
            <h3 className="font-display text-2xl text-ink">{city.highlightsTitle}</h3>
            <ul className="mt-4 divide-y divide-line overflow-hidden rounded-2xl bg-white">
              {city.highlights.map((h) => (
                <li key={h.name}>
                  <a
                    href={h.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-14 items-start justify-between gap-4 px-5 py-4 transition-colors duration-150 hover:bg-(--accent-soft) focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--accent)"
                  >
                    <span>
                      <span className="block font-semibold text-ink group-hover:text-(--accent)">{h.name}</span>
                      <span className="mt-0.5 block text-sm leading-snug text-mist">{h.detail}</span>
                    </span>
                    <span className="shrink-0 pt-0.5 text-right text-sm font-medium text-(--accent)">{h.when}</span>
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-2xl text-ink">Bom saber</h3>
            <ul className="mt-4 space-y-4">
              {city.closingNotes.map((note) => (
                <li key={note} className="flex gap-3 leading-relaxed text-ink/85">
                  <span aria-hidden className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-(--accent)" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
