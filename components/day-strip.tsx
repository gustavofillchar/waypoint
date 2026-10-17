"use client";

import { useEffect, useRef, useState } from "react";
import type { CityId } from "@/lib/trip";
import { useChecked } from "./checklist-store";
import { ChecklistIcon, TicketIcon } from "./icons";
import { localDayId, useNow } from "./use-now";

type StripDay = {
  id: string;
  dayNumber: number;
  weekdayShort: string;
  title: string;
};

type StripGroup = {
  city: CityId;
  label: string;
  days: StripDay[];
};

export function DayStrip({ groups, checklistIds }: { groups: StripGroup[]; checklistIds: string[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const now = useNow();
  const todayId = now === null ? null : localDayId(now);
  const checked = useChecked();
  const doneCount = checked === null ? null : checklistIds.filter((id) => checked[id]).length;

  useEffect(() => {
    const sections = groups
      .flatMap((g) => g.days)
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
  }, [groups]);

  useEffect(() => {
    const list = listRef.current;
    if (!activeId || !list) return;
    const chip = list.querySelector<HTMLElement>(`[data-day="${activeId}"]`);
    if (!chip) return;
    // Scroll only the strip horizontally so the page's own smooth scroll isn't interrupted.
    const listBox = list.getBoundingClientRect();
    const chipBox = chip.getBoundingClientRect();
    const left = list.scrollLeft + chipBox.left - listBox.left - listBox.width / 2 + chipBox.width / 2;
    list.scrollTo({ left, behavior: "smooth" });
  }, [activeId]);

  const shortcut =
    "flex min-h-11 shrink-0 items-center gap-1.5 rounded-xl px-2.5 text-sm font-medium text-ink transition-colors duration-150 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

  return (
    <nav aria-label="Dias da viagem" className="sticky top-0 z-30 border-b border-line bg-frost/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-stretch gap-2 pl-3 sm:px-6">
        <div ref={listRef} className="no-scrollbar flex min-w-0 flex-1 gap-4 overflow-x-auto py-2 pr-2">
          {groups.map((group) => (
            <div key={group.city} data-city={group.city} className="shrink-0">
              <p className="flex items-center gap-1.5 px-0.5 text-xs leading-none font-semibold text-(--accent)">
                <span aria-hidden className="size-1.5 rounded-full bg-(--accent)" />
                {group.label}
              </p>
              <ol className="mt-1.5 flex gap-1">
                {group.days.map((day) => {
                  const isActive = day.id === activeId;
                  const isToday = day.id === todayId;
                  return (
                    <li key={day.id}>
                      <a
                        href={`#${day.id}`}
                        data-day={day.id}
                        aria-current={isActive ? "location" : undefined}
                        aria-label={`${day.weekdayShort} ${day.dayNumber}: ${day.title}${isToday ? " (hoje)" : ""}`}
                        className={`relative flex h-11 w-10 flex-col items-center justify-center rounded-lg leading-none transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) ${
                          isActive ? "bg-(--accent) text-white" : "bg-white text-ink hover:bg-(--accent-soft)"
                        } ${isToday && !isActive ? "ring-2 ring-gold ring-inset" : ""}`}
                      >
                        <span className="font-display text-lg">{day.dayNumber}</span>
                        <span className={`mt-0.5 text-[0.625rem] ${isActive ? "text-white/80" : "text-mist"}`}>
                          {day.weekdayShort}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1 border-l border-line pr-2 pl-2 sm:pr-0">
          <a href="#trajetos" className={shortcut} aria-label="Trajetos">
            <TicketIcon className="size-5 text-mist" />
            <span className="hidden md:inline">Trajetos</span>
          </a>
          <a href="#checklist" className={shortcut} aria-label={`Checklist${doneCount === null ? "" : `: ${doneCount} de ${checklistIds.length} feitos`}`}>
            <ChecklistIcon className="size-5 text-brazil" />
            <span className="hidden md:inline">Checklist</span>
            <span className="font-mono text-xs text-mist tabular-nums">
              {doneCount === null ? checklistIds.length : `${doneCount}/${checklistIds.length}`}
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}
