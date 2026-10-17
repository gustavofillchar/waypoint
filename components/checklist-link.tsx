"use client";

import { useChecked } from "./checklist-store";
import { ArrowIcon, ChecklistIcon } from "./icons";

export function ChecklistLink({ cityId, cityName, ids }: { cityId: string; cityName: string; ids: string[] }) {
  const checked = useChecked();
  const done = checked === null ? null : ids.filter((id) => checked[id]).length;
  const complete = done === ids.length;

  return (
    <a
      href={`#checklist-${cityId}`}
      className="group flex min-h-12 items-center gap-3 rounded-xl px-1 py-2 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
    >
      <ChecklistIcon className="size-5 shrink-0 text-(--accent)" />
      <span className="font-medium group-hover:text-(--accent)">Preparativos para {cityName}</span>
      <span className={`font-mono text-sm tabular-nums ${complete ? "text-brazil" : "text-mist"}`}>
        {done === null ? `${ids.length} itens` : `${done}/${ids.length}`}
      </span>
      <ArrowIcon className="ml-auto size-4 shrink-0 text-mist transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-(--accent)" />
    </a>
  );
}
