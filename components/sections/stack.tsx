"use client";

import { motion } from "framer-motion";
import { TOOL_CATEGORIES } from "@/lib/content";
import { cn } from "@/lib/utils";

const accentToBorder = {
  violet: "hover:border-[rgb(var(--accent-violet)/0.5)]",
  pink: "hover:border-[rgb(var(--accent-pink)/0.5)]",
  amber: "hover:border-[rgb(var(--accent-amber)/0.5)]",
  cyan: "hover:border-[rgb(var(--accent-cyan)/0.5)]",
} as const;

const accentToGlow = {
  violet: "shadow-[0_0_60px_rgb(var(--accent-violet)/0.15)]",
  pink: "shadow-[0_0_60px_rgb(var(--accent-pink)/0.15)]",
  amber: "shadow-[0_0_60px_rgb(var(--accent-amber)/0.15)]",
  cyan: "shadow-[0_0_60px_rgb(var(--accent-cyan)/0.15)]",
} as const;

export function Stack() {
  return (
    <section
      id="stack"
      className="relative border-t border-white/5 bg-[rgb(var(--bg-base))] px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[rgb(var(--text-muted))]">
            <span className="inline-block h-px w-8 bg-[rgb(var(--text-muted))]" />
            <span>The toolkit</span>
          </div>
          <h2 className="font-display text-balance text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1] tracking-[-0.03em] md:max-w-[20ch]">
            I direct AI. These are
            <span className="gradient-text"> the brushes.</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-16 md:gap-6">
          {TOOL_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-white/8 bg-[rgb(var(--bg-panel))] p-6 transition-all duration-500 md:p-8",
                accentToBorder[cat.accent],
                "hover:" + accentToGlow[cat.accent],
              )}
            >
              {/* Gradient ring on hover */}
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-[rgb(var(--accent-violet)/0.2)] via-[rgb(var(--accent-pink)/0.15)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold tracking-tight">
                    {cat.title}
                  </h3>
                  <span className="font-mono text-xs text-[rgb(var(--text-muted))]">
                    0{i + 1}
                  </span>
                </div>

                <ul className="mt-6 flex flex-col gap-2">
                  {cat.tools.map((tool, j) => (
                    <motion.li
                      key={tool}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.08 + j * 0.05,
                      }}
                      className="flex items-center gap-2 text-sm text-[rgb(var(--text-muted))]"
                    >
                      <span className="font-mono text-[10px] opacity-50">
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      <span>{tool}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
