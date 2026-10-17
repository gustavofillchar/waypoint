"use client";

import { useSyncExternalStore } from "react";

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
const getServerSnapshot = () => null;

function parse(raw: string): Record<string, boolean> {
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export const itemId = (scope: string, item: string) => `${scope}:${item}`;

export function toggleItem(id: string) {
  const state = parse(getSnapshot());
  if (state[id]) delete state[id];
  else state[id] = true;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Checked items saved on this device, or null while rendering on the server. */
export function useChecked() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return raw === null ? null : parse(raw);
}
