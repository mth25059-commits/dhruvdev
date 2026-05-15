"use client";

import { SERVICES_MARQUEE } from "@/lib/content";

export function Marquee() {
  const items = [...SERVICES_MARQUEE, ...SERVICES_MARQUEE];
  return (
    <section
      aria-label="What I do"
      className="marquee relative overflow-hidden border-y border-white/5 bg-[rgb(var(--bg-panel)/0.4)] py-8 md:py-10"
    >
      <div className="mask-fade-r">
        <div className="marquee-track">
          {items.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="font-display flex shrink-0 items-center gap-12 text-[clamp(1.5rem,4vw,3.5rem)] font-semibold uppercase tracking-tight"
            >
              <span className="gradient-text">{label}</span>
              <span className="inline-block h-2 w-2 rounded-full bg-[rgb(var(--accent-amber))]" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
