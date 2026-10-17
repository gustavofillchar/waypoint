"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { ChecklistSection } from "@/lib/trip";
import { itemId, toggleItem, useChecked } from "./checklist-store";
import { CheckIcon } from "./icons";

function countDone(section: ChecklistSection, done: Record<string, boolean>) {
  const ids = section.groups.flatMap((g) => g.items.map((item) => itemId(section.id, item)));
  return { done: ids.filter((id) => done[id]).length, total: ids.length };
}

export function Checklist({ sections }: { sections: ChecklistSection[] }) {
  const checked = useChecked();
  const done = checked ?? {};
  const [activeId, setActiveId] = useState(sections[0].id);
  const [hideDone, setHideDone] = useState(false);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Links like #checklist-paris (from each city chapter) open the matching tab.
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.replace("#checklist-", "");
      if (sections.some((s) => s.id === id)) setActiveId(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [sections]);

  const counts = Object.fromEntries(sections.map((s) => [s.id, countDone(s, done)]));
  const totalDone = sections.reduce((sum, s) => sum + counts[s.id].done, 0);
  const total = sections.reduce((sum, s) => sum + counts[s.id].total, 0);
  const active = sections.find((s) => s.id === activeId) ?? sections[0];

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
    const back = event.key === "ArrowLeft" || event.key === "ArrowUp";
    const step = forward ? 1 : back ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = sections[(index + step + sections.length) % sections.length];
    setActiveId(next.id);
    tabRefs.current[next.id]?.focus();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div className="min-w-0 flex-1 basis-64">
          <p className="text-ink" aria-live="polite">
            {checked === null ? (
              <span className="text-mist">{total} itens</span>
            ) : (
              <>
                <span className="font-semibold tabular-nums">{totalDone}</span>
                <span className="text-mist"> de {total} feitos</span>
              </>
            )}
          </p>
          <div
            className="mt-2 h-1.5 overflow-hidden rounded-full bg-line"
            role="progressbar"
            aria-label="Checklist concluído"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={totalDone}
          >
            <div
              className="h-full rounded-full bg-brazil transition-[width] duration-300 ease-out"
              style={{ width: `${total ? (totalDone / total) * 100 : 0}%` }}
            />
          </div>
        </div>
        <button
          type="button"
          aria-pressed={hideDone}
          onClick={() => setHideDone((v) => !v)}
          className="group inline-flex min-h-11 items-center gap-2.5 rounded-full px-1 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          <span
            aria-hidden
            className={`relative h-6 w-10 rounded-full transition-colors duration-200 ${hideDone ? "bg-ink" : "bg-line"}`}
          >
            <span
              className={`absolute top-1 left-1 size-4 rounded-full bg-white shadow-[0_1px_2px_rgb(14_24_48/0.3)] transition-transform duration-200 ease-out ${hideDone ? "translate-x-4" : ""}`}
            />
          </span>
          Ocultar feitos
        </button>
      </div>

      <div className="mt-6 lg:grid lg:grid-cols-[14rem_1fr] lg:items-start lg:gap-12">
        <div
          role="tablist"
          aria-label="Listas do checklist"
          className="grid grid-cols-4 gap-1 rounded-2xl bg-line/70 p-1 lg:sticky lg:top-[calc(var(--strip-height)+1.5rem)] lg:grid-cols-1"
        >
          {sections.map((section, index) => {
            const isActive = section.id === active.id;
            const c = counts[section.id];
            const complete = checked !== null && c.done === c.total;
            return (
              <button
                key={section.id}
                ref={(el) => {
                  tabRefs.current[section.id] = el;
                }}
                id={`checklist-${section.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="checklist-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveId(section.id)}
                onKeyDown={(e) => onTabKey(e, index)}
                data-city={section.city}
                className={`day-anchor flex min-h-14 flex-col items-center justify-center rounded-xl px-1 py-2 transition-colors lg:min-h-12 lg:flex-row lg:justify-between lg:px-4 duration-150 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--accent) ${
                  isActive ? "bg-white text-ink shadow-[0_1px_3px_rgb(14_24_48/0.12)]" : "text-mist hover:text-ink"
                }`}
              >
                <span className={`text-[0.95rem] leading-tight font-semibold ${isActive ? "text-(--accent)" : ""}`}>
                  {section.label}
                </span>
                <span className="mt-0.5 flex items-center gap-1 font-mono text-xs tabular-nums lg:mt-0">
                  {complete && <CheckIcon className="size-3 text-brazil" />}
                  {checked === null ? c.total : `${c.done}/${c.total}`}
                </span>
              </button>
            );
          })}
        </div>

        <div
          id="checklist-panel"
          role="tabpanel"
          aria-labelledby={`checklist-${active.id}`}
          data-city={active.city}
          className="mt-6 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:mt-0"
        >
          {active.groups.map((group) => {
            const items = group.items.map((item) => ({ item, id: itemId(active.id, item) }));
            const groupDone = items.filter((i) => done[i.id]).length;
            const visible = hideDone ? items.filter((i) => !done[i.id]) : items;

            return (
              <section key={group.title} aria-label={group.title}>
                <div className="flex items-baseline justify-between gap-3 border-b border-ink/15 pb-2">
                  <h3 className="font-semibold text-ink">{group.title}</h3>
                  <span className="font-mono text-xs text-mist tabular-nums">
                    {checked === null ? items.length : `${groupDone}/${items.length}`}
                  </span>
                </div>
                {visible.length === 0 ? (
                  <p className="flex items-center gap-2 py-3 text-sm text-mist">
                    <CheckIcon className="size-4 text-brazil" />
                    Tudo feito aqui.
                  </p>
                ) : (
                  <ul className="divide-y divide-line">
                    {visible.map(({ item, id }) => {
                      const isChecked = Boolean(done[id]);
                      return (
                        <li key={id}>
                          <label className="group flex min-h-12 cursor-pointer items-start gap-3 py-3">
                            <input
                              type="checkbox"
                              className="peer sr-only"
                              checked={isChecked}
                              onChange={() => toggleItem(id)}
                            />
                            <span
                              aria-hidden
                              className={`mt-px grid size-[1.375rem] shrink-0 place-items-center rounded-md border-2 transition-colors duration-150 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--accent) ${
                                isChecked
                                  ? "border-(--accent) bg-(--accent) text-white"
                                  : "border-mist/45 bg-white text-transparent group-hover:border-(--accent)"
                              }`}
                            >
                              <CheckIcon className="size-3.5" />
                            </span>
                            <span
                              className={`leading-snug transition-colors duration-150 ${
                                isChecked ? "text-mist line-through decoration-mist/50" : "text-ink"
                              }`}
                            >
                              {item}
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
