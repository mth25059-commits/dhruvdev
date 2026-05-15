"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SERVICES } from "@/lib/content";
import { TelegramMock } from "@/components/mocks/telegram-mock";
import { VpsMock } from "@/components/mocks/vps-mock";

const accentRing = {
  violet: "rgb(var(--accent-violet))",
  pink: "rgb(var(--accent-pink))",
  amber: "rgb(var(--accent-amber))",
  cyan: "rgb(var(--accent-cyan))",
} as const;

export function Services() {
  return (
    <section
      id="services"
      className="relative border-t border-white/5 bg-[rgb(var(--bg-panel))] px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[rgb(var(--text-muted))]">
            <span className="inline-block h-px w-8 bg-[rgb(var(--text-muted))]" />
            <span>What I build</span>
          </div>
          <h2 className="font-display text-balance text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1] tracking-[-0.03em] md:max-w-[20ch]">
            Four lanes.
            <span className="gradient-text"> One operator.</span>
          </h2>
        </div>

        <div className="mt-12 flex flex-col gap-8 md:mt-20 md:gap-16">
          {SERVICES.map((s, i) => (
            <ServiceRow key={s.number} index={i} service={s}>
              {/* Right column visual */}
              {i === 1 ? (
                <Visual3D accent={accentRing[s.accent]}>
                  <TelegramMock />
                </Visual3D>
              ) : i === 3 ? (
                <Visual3D accent={accentRing[s.accent]}>
                  <VpsMock />
                </Visual3D>
              ) : i === 0 ? (
                <Visual3D accent={accentRing[s.accent]}>
                  <BrowserMock />
                </Visual3D>
              ) : (
                <Visual3D accent={accentRing[s.accent]}>
                  <AutomationMock />
                </Visual3D>
              )}
            </ServiceRow>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({
  service,
  index,
  children,
}: {
  service: (typeof SERVICES)[number];
  index: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reverse = index % 2 === 1;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12"
    >
      <div className={`order-1 md:col-span-6 ${reverse ? "md:order-2" : ""}`}>
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-[rgb(var(--text-muted))]">
            {service.number}
          </span>
          <h3 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1] tracking-[-0.03em]">
            {service.title}
          </h3>
        </div>
        <p className="mt-4 text-balance text-lg text-[rgb(var(--text-muted))] md:max-w-[26ch] md:text-xl">
          {service.blurb}
        </p>
        <ul className="mt-6 flex flex-col gap-3">
          {service.bullets.map((b, j) => (
            <li
              key={j}
              className="flex items-start gap-3 text-sm text-[rgb(var(--text-muted))] md:text-base"
            >
              <span
                className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: accentRing[service.accent] }}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={`order-2 md:col-span-6 ${reverse ? "md:order-1" : ""}`}>
        {children}
      </div>
    </motion.div>
  );
}

function Visual3D({
  children,
  accent,
}: {
  children: ReactNode;
  accent: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -12]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <div className="relative" style={{ perspective: 1400 }} ref={ref}>
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-[4/3] w-full rounded-3xl"
      >
        {/* Glow */}
        <div
          className="pointer-events-none absolute -inset-8 -z-10 rounded-[2rem] blur-3xl"
          style={{
            background: `radial-gradient(60% 60% at 50% 50%, ${accent.replace("rgb(", "rgba(").replace(")", " / 0.25)")}, transparent 70%)`,
          }}
        />
        <div className="relative h-full w-full">{children}</div>
      </motion.div>
    </div>
  );
}

function BrowserMock() {
  return (
    <div className="h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c14] shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/5 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="rounded-md bg-white/5 px-3 py-0.5 font-mono text-[10px] text-white/60">
          dhruvdeveloper.me
        </div>
        <div className="w-12" />
      </div>
      <div className="grid h-[calc(100%-32px)] grid-cols-12 gap-3 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="col-span-7 flex flex-col justify-between"
        >
          <div>
            <div className="h-2 w-12 rounded bg-white/10" />
            <div className="mt-3 h-5 w-32 rounded bg-gradient-to-r from-[rgb(var(--accent-violet))] via-[rgb(var(--accent-pink))] to-[rgb(var(--accent-amber))]" />
            <div className="mt-2 h-3 w-44 rounded bg-white/10" />
            <div className="mt-1.5 h-3 w-36 rounded bg-white/8" />
          </div>
          <div className="flex gap-2">
            <div className="h-7 w-20 rounded-full bg-[rgb(var(--accent-violet))]" />
            <div className="h-7 w-16 rounded-full border border-white/15 bg-white/5" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="col-span-5 rounded-xl bg-gradient-to-br from-[rgb(var(--accent-violet)/0.35)] via-[rgb(var(--accent-pink)/0.25)] to-[rgb(var(--accent-amber)/0.15)]"
        />
      </div>
    </div>
  );
}

function AutomationMock() {
  const nodes = [
    { label: "Webhook", x: 6, y: 30 },
    { label: "AI", x: 38, y: 12 },
    { label: "DB", x: 38, y: 50 },
    { label: "Send", x: 72, y: 30 },
  ];
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c14] shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/5 px-3 py-2">
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
          Workflow · live
        </div>
        <div className="text-[10px] text-emerald-400">● running</div>
      </div>
      <svg viewBox="0 0 100 70" className="h-[calc(100%-30px)] w-full">
        <defs>
          <linearGradient id="flow-grad" x1="0" y1="0" x2="100" y2="0">
            <stop offset="0" stopColor="rgb(var(--accent-violet))" />
            <stop offset="0.5" stopColor="rgb(var(--accent-pink))" />
            <stop offset="1" stopColor="rgb(var(--accent-amber))" />
          </linearGradient>
        </defs>
        {/* Lines */}
        <path
          d="M14,32 C26,32 26,16 38,16"
          stroke="url(#flow-grad)"
          strokeWidth="0.6"
          fill="none"
          strokeDasharray="2 2"
          className="logo-path"
        />
        <path
          d="M14,32 C26,32 26,52 38,52"
          stroke="url(#flow-grad)"
          strokeWidth="0.6"
          fill="none"
          strokeDasharray="2 2"
          className="logo-path"
          style={{ animationDelay: "0.3s" }}
        />
        <path
          d="M46,16 C58,16 58,32 72,32"
          stroke="url(#flow-grad)"
          strokeWidth="0.6"
          fill="none"
          strokeDasharray="2 2"
          className="logo-path"
          style={{ animationDelay: "0.6s" }}
        />
        <path
          d="M46,52 C58,52 58,32 72,32"
          stroke="url(#flow-grad)"
          strokeWidth="0.6"
          fill="none"
          strokeDasharray="2 2"
          className="logo-path"
          style={{ animationDelay: "0.9s" }}
        />
        {/* Animated pulse */}
        <circle r="0.9" fill="rgb(var(--accent-pink))">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M14,32 C26,32 26,16 38,16 C58,16 58,32 72,32"
          />
        </circle>
        {/* Nodes */}
        {nodes.map((n) => (
          <g key={n.label} transform={`translate(${n.x},${n.y})`}>
            <rect
              x="0"
              y="-4"
              width="14"
              height="8"
              rx="2"
              fill="rgba(255,255,255,0.05)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="0.3"
            />
            <text
              x="7"
              y="0.8"
              textAnchor="middle"
              fontSize="3"
              fill="white"
              fontFamily="ui-monospace, monospace"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
