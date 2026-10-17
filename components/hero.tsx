import { cities, days, trip } from "@/lib/trip";
import { Countdown } from "./countdown";
import { ArrowIcon } from "./icons";

const nameColor = {
  paris: "text-gold",
  london: "text-[#ff9aa8]",
  lisbon: "text-[#9fc0f5]",
};

const placeLabel = {
  paris: "Paris",
  london: "Londres",
  lisbon: "Lisboa",
  brazil: "voo para casa",
};

function joinNames(names: string[]) {
  return names.length > 1 ? `${names.slice(0, -1).join(", ")} e ${names.at(-1)}` : names.join("");
}

export function Hero() {
  const dayMeta = days.map((d) => ({
    id: d.id,
    title: d.title,
    place: placeLabel[d.cities.at(-1) ?? "paris"],
  }));

  return (
    <header className="relative overflow-hidden bg-night text-white">
      <div aria-hidden className="snow" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pt-10 pb-10 sm:px-6 sm:pt-16 sm:pb-14 lg:grid-cols-[1fr_26rem] lg:items-end lg:gap-16">
        <div>
          <h1 className="font-display text-[2.75rem] leading-[0.95] tracking-[-0.01em] text-balance sm:text-6xl lg:text-7xl">
            {trip.title}
          </h1>
          <p className="mt-4 text-lg text-white/80">{trip.period}</p>
          <p className="mt-1 text-white/60">{joinNames(trip.travelers)}</p>

          <div className="mt-8 border-t border-white/15 pt-6">
            <Countdown departureISO={trip.departureISO} days={dayMeta} />
          </div>
        </div>

        <nav aria-label="Cidades">
          <ol className="divide-y divide-white/15 border-y border-white/15">
            {cities.map((city) => (
              <li key={city.id}>
                <a
                  href={`#${city.id}`}
                  className="group flex min-h-16 items-center gap-4 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  <span className={`font-display text-3xl leading-none sm:text-4xl ${nameColor[city.id]}`}>
                    {city.name}
                  </span>
                  <span className="ml-auto text-right text-sm leading-tight text-white/70">
                    <span className="block font-medium text-white/90 tabular-nums">{city.period}</span>
                    {city.tagline}
                  </span>
                  <ArrowIcon className="size-4 shrink-0 text-white/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white" />
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </header>
  );
}
