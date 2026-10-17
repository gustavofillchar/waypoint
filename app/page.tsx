import { Chapter } from "@/components/chapter";
import { Checklist } from "@/components/checklist";
import { DayStrip } from "@/components/day-strip";
import { Hero } from "@/components/hero";
import { LinkChip } from "@/components/link-chip";
import { Tickets } from "@/components/tickets";
import { cities, days, generalChecklist, legs, trip, usefulLinks } from "@/lib/trip";

export default function Home() {
  const doors = days.map((d) => ({
    id: d.id,
    dayNumber: d.dayNumber,
    weekdayShort: d.weekday.slice(0, 3),
    title: d.title,
    cities: d.cities,
  }));

  return (
    <>
      <Hero />
      <DayStrip days={doors} />

      <main>
        <section aria-labelledby="trajetos-title" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs tracking-[0.24em] text-mist uppercase">4 trechos · 3 países</p>
              <h2 id="trajetos-title" className="mt-2 font-display text-4xl text-ink sm:text-5xl">
                Os trajetos
              </h2>
            </div>
            <p className="max-w-sm text-mist">
              Horários locais de cada cidade. Os marcados com ≈ são estimativas: confirme no cartão de embarque.
            </p>
          </div>
          <Tickets legs={legs} />
        </section>

        {cities.map((city) => (
          <Chapter key={city.id} city={city} />
        ))}

        <section data-city="brazil" aria-labelledby="geral-title" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="rounded-3xl bg-white p-6 sm:p-8">
              <h2 id="geral-title" className="font-display text-2xl text-ink">
                Para a viagem toda
              </h2>
              <p className="mt-1 mb-6 text-sm text-mist">Antes de sair de casa. Fica salvo neste aparelho.</p>
              <Checklist scope="geral" groups={generalChecklist} />
            </div>
            <div className="rounded-3xl bg-white p-6 sm:p-8">
              <h2 className="font-display text-2xl text-ink">Links úteis</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {usefulLinks.map((link) => (
                  <LinkChip key={link.href} link={link} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative overflow-hidden bg-night text-white">
        <div aria-hidden className="snow slow" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
          <p className="font-display text-[clamp(3rem,10vw,7rem)] leading-none text-gold">Feliz 2027 🥂</p>
          <p className="mt-6 font-mono text-xs tracking-[0.24em] text-white/60 uppercase">
            {trip.travelers.join(" · ")}
          </p>
        </div>
      </footer>
    </>
  );
}
