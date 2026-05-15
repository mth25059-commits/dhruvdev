"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/content";

export function About() {
  return (
    <section
      id="about"
      className="relative border-t border-white/5 bg-[rgb(var(--bg-base))] px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[rgb(var(--text-muted))]">
            <span className="inline-block h-px w-8 bg-[rgb(var(--text-muted))]" />
            <span>How I work</span>
          </div>
          <h2 className="font-display text-balance text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1] tracking-[-0.03em] md:max-w-[20ch]">
            Most AI-built sites look like AI built them.
            <span className="gradient-text"> Mine don&apos;t.</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-12 md:gap-16">
          {/* Manifesto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-7"
          >
            <div className="space-y-6 text-pretty text-base text-[rgb(var(--text-muted))] md:text-lg">
              <p>
                I don&apos;t write code line by line. I direct AI — Cursor,
                Claude, v0, ChatGPT — to build, test, and ship.
              </p>
              <p>
                My edge isn&apos;t typing. It&apos;s{" "}
                <span className="text-[rgb(var(--text-primary))]">taste</span>,{" "}
                <span className="text-[rgb(var(--text-primary))]">structure</span>
                , and the{" "}
                <span className="text-[rgb(var(--text-primary))]">patience</span>{" "}
                to polish until something feels right.
              </p>
              <p className="font-display text-2xl text-[rgb(var(--text-primary))] md:text-3xl">
                Sites that look like $5M.
                <br />
                Built on a $5 VPS.
              </p>
              <p className="text-sm uppercase tracking-[0.16em] text-[rgb(var(--text-muted))]">
                Based in India · Available worldwide · Shipping since 2024
              </p>
            </div>
          </motion.div>

          {/* Numbers / stats card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="md:col-span-5"
          >
            <div className="grid grid-cols-2 gap-3">
              {[
                { num: "20+", label: "Sites shipped" },
                { num: "12", label: "TG bots live" },
                { num: "99.9%", label: "Uptime" },
                { num: "<2s", label: "Avg load" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="rounded-2xl border border-white/8 bg-[rgb(var(--bg-panel))] p-6"
                >
                  <div className="font-display text-3xl font-semibold gradient-text md:text-4xl">
                    {s.num}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-[0.15em] text-[rgb(var(--text-muted))]">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Process timeline */}
        <div className="mt-16 md:mt-24">
          <div className="text-xs uppercase tracking-[0.18em] text-[rgb(var(--text-muted))]">
            The process
          </div>
          <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/5 md:grid-cols-5">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="group relative bg-[rgb(var(--bg-panel))] p-5 transition-colors hover:bg-[rgb(var(--bg-elevated))] md:p-6"
              >
                <div className="font-mono text-xs text-[rgb(var(--text-muted))]">
                  {step.num}
                </div>
                <div className="mt-2 text-base font-semibold">{step.title}</div>
                <div className="mt-1 text-sm text-[rgb(var(--text-muted))]">
                  {step.text}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
