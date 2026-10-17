import { Chapter } from "@/components/chapter";
import { Checklist } from "@/components/checklist";
import { DayStrip } from "@/components/day-strip";
import { Hero } from "@/components/hero";
import { LinkChip } from "@/components/link-chip";
import { Tickets } from "@/components/tickets";
import { checklistSections, cities, dayById, legs, trip, usefulLinks } from "@/lib/trip";

const weekdayShort = (weekday: string) => weekday.slice(0, 3).toLowerCase();

export default function Home() {
  const stripGroups = cities.map((city) => ({
    city: city.id,
    label: city.name,
    days: city.dayIds.map((id) => {
      const d = dayById[id];
      return { id: d.id, dayNumber: d.dayNumber, weekdayShort: weekdayShort(d.weekday), title: d.title };
    }),
  }));
  const checklistIds = checklistSections.flatMap((s) => s.groups.flatMap((g) => g.items.map((i) => `${s.id}:${i}`)));

  return (
    <>
      <Hero />
      <DayStrip groups={stripGroups} checklistIds={checklistIds} />

      <main>
        <section id="trajetos" aria-labelledby="trajetos-title" className="day-anchor mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-8">
            <h2 id="trajetos-title" className="font-display text-4xl text-ink sm:text-5xl">
              Trajetos
            </h2>
            <p className="max-w-md text-mist">
              Horários locais. Os marcados com ≈ são estimativas: confirme no cartão de embarque.
            </p>
          </div>
          <Tickets legs={legs} />
        </section>

        <section
          id="checklist"
          aria-labelledby="checklist-title"
          className="day-anchor border-y border-line bg-[#f7f9fb]"
        >
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
            <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-8">
              <h2 id="checklist-title" className="font-display text-4xl text-ink sm:text-5xl">
                Checklist
              </h2>
              <p className="max-w-md text-mist">O que resolver antes de cada parte. Fica salvo neste aparelho.</p>
            </div>
            <Checklist sections={checklistSections} />

            <div data-city="brazil" className="mt-12 border-t border-line pt-6">
              <h3 className="font-semibold text-ink">Links úteis</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {usefulLinks.map((link) => (
                  <LinkChip key={link.href} link={link} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {cities.map((city) => (
          <Chapter key={city.id} city={city} />
        ))}
      </main>

      <footer className="relative overflow-hidden bg-night text-white">
        <div aria-hidden className="snow" />
        <div className="relative mx-auto max-w-6xl px-5 py-16 text-center sm:px-6 sm:py-20">
          <p className="font-display text-5xl leading-none text-gold sm:text-7xl">Feliz 2027</p>
          <p className="mt-4 text-white/60">{trip.travelers.join(" · ")}</p>
        </div>
      </footer>
    </>
  );
}
