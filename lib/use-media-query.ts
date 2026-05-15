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

/**
 * Looser desktop check used for purely decorative motion (background globe,
 * code rain). Anything ≥ 1024px gets the decoration. Mouse-driven effects
 * (custom cursor, grid spotlight) still gate on the stricter `useIsDesktop`.
 */
export function useIsWideViewport() {
  return useMediaQuery("(min-width: 1024px)");
}
