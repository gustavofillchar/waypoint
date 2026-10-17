"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { CityId } from "@/lib/trip";
import { localDayId, useNow } from "./use-now";

type DoorDay = {
  id: string;
  dayNumber: number;
  weekdayShort: string;
  title: string;
  cities: CityId[];
};

const cityColor: Record<CityId, string> = {
  paris: "var(--color-paris)",
  london: "var(--color-london)",
  lisbon: "var(--color-lisbon)",
  brazil: "var(--color-brazil)",
};

const cityLegend: { id: CityId; label: string }[] = [
  { id: "paris", label: "Paris" },
  { id: "london", label: "Londres" },
  { id: "lisbon", label: "Lisboa" },
];

export function DayStrip({ days }: { days: DoorDay[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const now = useNow();
  const todayId = now === null ? null : localDayId(now);

  useEffect(() => {
    const sections = days
      .map((d) => document.getElementById(d.id))
      .filter((el): el is HTMLElement => el !== null);

    let frame = 0;
    const update = () => {
      frame = 0;
      // The active day is the last one whose top has crossed the middle of the screen.
      const line = window.innerHeight * 0.5;
      let current: string | null = null;
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= line && rect.bottom > 0) current = section.id;
      }
      setActiveId(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [days]);

  useEffect(() => {
    const list = listRef.current;
    if (!activeId || !list) return;
    const door = list.querySelector<HTMLElement>(`[data-door="${activeId}"]`);
    if (!door) return;
    // Scroll only the strip horizontally so the page's own smooth scroll isn't interrupted.
    const left = door.offsetLeft - list.clientWidth / 2 + door.clientWidth / 2;
    list.scrollTo({ left, behavior: "smooth" });
  }, [activeId]);

  return (
    <nav
      aria-label="Dias da viagem"
      className="sticky top-0 z-30 border-b border-line bg-frost/90 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-3 sm:px-6">
        <ol
          ref={listRef}
          className="no-scrollbar relative flex min-w-0 flex-1 snap-x gap-1.5 overflow-x-auto py-2.5"
        >
          {days.map((day) => {
            const [a, b] = day.cities;
            const isActive = day.id === activeId;
            const isToday = day.id === todayId;
            return (
              <li key={day.id} className="snap-center">
                <a
                  href={`#${day.id}`}
                  data-door={day.id}
                  data-split={b ? "true" : "false"}
                  aria-current={isActive ? "location" : undefined}
                  title={`${day.dayNumber}/12 · ${day.title}`}
                  style={
                    {
                      "--door-a": cityColor[a],
                      "--door-b": cityColor[b ?? a],
                    } as CSSProperties
                  }
                  className={`door relative flex h-[3.6rem] w-11 flex-col items-center justify-center rounded-t-[1.4rem] rounded-b-md text-white transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:w-12 ${
                    isActive
                      ? "-translate-y-0.5 shadow-[0_6px_14px_-4px_rgb(14_24_48/0.55)] ring-2 ring-gold ring-offset-2 ring-offset-frost"
                      : "opacity-80 hover:-translate-y-0.5 hover:opacity-100"
                  }`}
                >
                  <span className="font-display text-xl leading-none">{day.dayNumber}</span>
                  <span className="mt-1 font-mono text-[0.55rem] tracking-wider uppercase opacity-80">
                    {day.weekdayShort}
                  </span>
                  {isToday && (
                    <span className="absolute -top-1 -right-1 rounded-full bg-gold px-1 font-mono text-[0.5rem] font-medium tracking-wide text-ink uppercase">
                      hoje
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </ol>
        <ul className="hidden shrink-0 gap-3 font-mono text-[0.65rem] tracking-wider text-mist uppercase lg:flex">
          {cityLegend.map((c) => (
            <li key={c.id} className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full" style={{ background: cityColor[c.id] }} />
              {c.label}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
