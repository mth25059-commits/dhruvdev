"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which #id section is currently most-visible in the viewport.
 * Uses IntersectionObserver — no scroll listeners, no rAF, no layout thrash.
 */
export function useActiveSection(ids: string[]) {
  // Start with no active section so the navbar shows neutral state until
  // the user has actually scrolled into one of the tracked sections.
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    // Track each section's intersection ratio, pick the one with the highest.
    const ratios = new Map<string, number>();
    ids.forEach((id) => ratios.set(id, 0));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        let best = ids[0] ?? "";
        let bestRatio = -1;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        // Only update when something is actually intersecting
        if (bestRatio > 0) setActive(best);
      },
      {
        // Two viewport bands so we always see the most visible section,
        // and a slight top inset so sticky navbar doesn't count as "in view".
        rootMargin: "-30% 0px -30% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
