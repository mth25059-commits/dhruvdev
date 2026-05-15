"use client";

import { useSyncExternalStore } from "react";

const subscribe = (query: string) => (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(query);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
};

const getSnapshot = (query: string) => () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia(query).matches;
};

const getServerSnapshot = () => false;

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    subscribe(query),
    getSnapshot(query),
    getServerSnapshot,
  );
}

export function useIsDesktop() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
