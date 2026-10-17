"use client";

import { useSyncExternalStore } from "react";
import type { ChecklistGroup } from "@/lib/trip";
import { CheckIcon } from "./icons";

const STORAGE_KEY = "waypoint:checklist";
const CHANGE_EVENT = "waypoint:checklist-change";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

const getSnapshot = () => window.localStorage.getItem(STORAGE_KEY) ?? "{}";
const getServerSnapshot = () => "{}";

function parse(raw: string): Record<string, boolean> {
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function toggle(id: string) {
  const state = parse(getSnapshot());
  if (state[id]) delete state[id];
  else state[id] = true;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function Checklist({ scope, groups }: { scope: string; groups: ChecklistGroup[] }) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const done = parse(raw);

  const ids = groups.flatMap((g) => g.items.map((item) => `${scope}:${item}`));
  const doneCount = ids.filter((id) => done[id]).length;
  const progress = ids.length ? doneCount / ids.length : 0;

  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <div
          className="h-1.5 flex-1 overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-label="Preparativos concluídos"
          aria-valuemin={0}
          aria-valuemax={ids.length}
          aria-valuenow={doneCount}
        >
          <div
            className="h-full rounded-full bg-(--accent) transition-[width] duration-500"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <span className="font-mono text-xs text-mist tabular-nums">
          {doneCount}/{ids.length}
        </span>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {groups.map((group) => (
          <fieldset key={group.title}>
            <legend className="mb-2 font-mono text-[0.7rem] tracking-[0.16em] text-mist uppercase">
              {group.title}
            </legend>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const id = `${scope}:${item}`;
                const checked = Boolean(done[id]);
                return (
                  <li key={item}>
                    <label className="group flex cursor-pointer items-start gap-3 rounded-lg px-2 py-1.5 transition hover:bg-(--accent-soft)">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={checked}
                        onChange={() => toggle(id)}
                      />
                      <span
                        className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border-2 transition peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--accent) ${
                          checked
                            ? "border-(--accent) bg-(--accent) text-white"
                            : "border-line bg-white text-transparent group-hover:border-(--accent)"
                        }`}
                      >
                        <CheckIcon className="size-3.5" />
                      </span>
                      <span
                        className={`text-[0.95rem] leading-snug transition ${
                          checked ? "text-mist line-through decoration-(--accent)/60" : "text-ink"
                        }`}
                      >
                        {item}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        ))}
      </div>
    </div>
  );
}
