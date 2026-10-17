import { cities, days, trip } from "@/lib/trip";
import { Countdown } from "./countdown";
import { PlaneIcon, TrainIcon } from "./icons";

const lineColor = {
  paris: "text-gold",
  london: "text-[#ff8f9f]",
  lisbon: "text-[#93b8f2]",
};

const placeLabel = {
  paris: "🇫🇷 Paris",
  london: "🇬🇧 Londres",
  lisbon: "🇵🇹 Lisboa",
  brazil: "🇧🇷 Voo para casa",
};

export function Hero() {
  const dayMeta = days.map((d) => ({
    id: d.id,
    title: d.title,
    place: placeLabel[d.cities.at(-1) ?? "paris"],
  }));

  return (
    <header className="relative overflow-hidden bg-night text-white">
      <div aria-hidden className="snow slow" />
      <div aria-hidden className="snow" />
      <div aria-hidden className="snow fast" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-night-2/80 to-transparent"
      />

      <div className="relative mx-auto max-w-6xl px-4 pt-8 pb-16 sm:px-6 sm:pb-24">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 font-mono text-[0.7rem] tracking-[0.24em] text-white/60 uppercase">
          <span>Eurotrip de Natal</span>
          <span>{trip.period.replace(" de 2026", "")} · 2026</span>
        </div>

        <h1 className="mt-14 sm:mt-20">
          <span className="sr-only">Eurotrip de Natal: </span>
          {cities.map((city, i) => (
            <a
              key={city.id}
              href={`#${city.id}`}
              className="rise group flex flex-wrap items-baseline gap-x-6 gap-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              style={{ animationDelay: `${i * 140}ms` }}
            >
              <span
                className={`font-display text-[clamp(4rem,15vw,10.5rem)] leading-[0.9] tracking-[-0.02em] transition group-hover:translate-x-2 ${lineColor[city.id]}`}
              >
                {city.name}
              </span>
              <span className="font-mono text-xs tracking-[0.16em] text-white/55 uppercase sm:text-sm">
                {city.period} · {city.tagline}
              </span>
            </a>
          ))}
        </h1>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="rise" style={{ animationDelay: "500ms" }}>
            <p className="font-mono text-[0.7rem] tracking-[0.24em] text-white/50 uppercase">Passageiros</p>
            <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
              {trip.travelers.map((name) => (
                <li key={name} className="font-display text-2xl text-white sm:text-3xl">
                  {name}
                </li>
              ))}
            </ul>
            <p
              className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-sm text-white/70"
              aria-label="Rota: Guarulhos, Paris, Londres, Lisboa, Paris, Guarulhos"
            >
              {trip.route.map((code, i) => (
                <span key={`${code}-${i}`} className="flex items-center gap-2">
                  {i > 0 &&
                    (code === "STP" ? (
                      <TrainIcon className="size-4 text-gold" />
                    ) : (
                      <PlaneIcon className="size-4 text-gold" />
                    ))}
                  <span className={code === "GRU" ? "text-white" : undefined}>{code}</span>
                </span>
              ))}
            </p>
          </div>

          <div className="rise" style={{ animationDelay: "650ms" }}>
            <Countdown departureISO={trip.departureISO} days={dayMeta} />
          </div>
        </div>
      </div>
    </header>
  );
}
