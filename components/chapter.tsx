import { dayById, maps, type City } from "@/lib/trip";
import { Checklist } from "./checklist";
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

  return (
    <section id={city.id} data-city={city.id} aria-labelledby={`${city.id}-title`}>
      <div className={`${bandClass[city.id]} text-white`}>
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6 sm:pt-24">
          <p className="font-mono text-xs tracking-[0.24em] text-white/70 uppercase">
            {city.flag} {city.period} · {city.localName}
          </p>
          <h2
            id={`${city.id}-title`}
            className="mt-3 font-display text-[clamp(4.5rem,17vw,12rem)] leading-[0.82] tracking-[-0.02em]"
          >
            {city.name}
          </h2>
          <p className={`mt-4 font-display text-2xl sm:text-3xl ${taglineColor[city.id]}`}>{city.tagline}</p>

          <div className="mt-10 flex flex-col gap-4 rounded-2xl bg-black/25 p-5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <PinIcon className="mt-0.5 size-5 shrink-0 text-white/70" />
              <div>
                <p className="font-mono text-[0.65rem] tracking-[0.2em] text-white/60 uppercase">Hospedagem</p>
                <p className="mt-0.5 leading-snug">{city.address}</p>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <a
                href={maps(city.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-(--accent) transition hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Abrir no Google Maps
                <ArrowIcon className="size-4" />
              </a>
              <CopyButton
                text={city.address}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/40 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="max-w-3xl py-12 font-display text-2xl leading-snug text-ink sm:text-[1.9rem]">
          {city.intro}
        </p>

        {days.map((day) => (
          <DayCard key={day.id} day={day} chapterCity={city.id} />
        ))}

        <div className="grid gap-6 border-t border-line py-14 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-2xl text-ink">{city.highlightsTitle}</h3>
              <ul className="mt-4 divide-y divide-line rounded-2xl bg-white">
                {city.highlights.map((h) => (
                  <li key={h.name}>
                    <a
                      href={h.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start justify-between gap-4 px-5 py-4 transition hover:bg-(--accent-soft) focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--accent)"
                    >
                      <span>
                        <span className="block font-semibold text-ink group-hover:text-(--accent)">{h.name}</span>
                        <span className="mt-0.5 block text-sm leading-snug text-mist">{h.detail}</span>
                      </span>
                      <span className="shrink-0 pt-0.5 font-mono text-[0.7rem] tracking-wider text-(--accent) uppercase">
                        {h.when}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-2xl text-ink">Bom saber</h3>
              <ul className="mt-4 space-y-3">
                {city.closingNotes.map((note) => (
                  <li key={note} className="flex gap-3 leading-relaxed text-ink/80">
                    <span aria-hidden className="mt-2.5 h-0.5 w-3 shrink-0 bg-(--accent-2)" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 sm:p-8">
            <h3 className="font-display text-2xl text-ink">Preparativos para {city.name}</h3>
            <p className="mt-1 mb-6 text-sm text-mist">Marque o que já foi feito. Fica salvo neste aparelho.</p>
            <Checklist scope={city.id} groups={city.checklist} />
          </div>
        </div>
      </div>
    </section>
  );
}
