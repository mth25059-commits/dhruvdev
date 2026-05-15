"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { useIsWideViewport } from "@/lib/use-media-query";

/**
 * Two pieces:
 *   <HeroGlobe />        — wireframe rotating sphere + aurora halo, placed on
 *                          the right side of the hero. SVG, GPU transform only.
 *   <CodeRainBackground />— fixed full-page layer of drifting code snippets
 *                          rising up the viewport. Subtle, color-tinted, GPU.
 *
 * Both are disabled on touch devices and when prefers-reduced-motion is set.
 */

const CODE_SNIPPETS = [
  "const $ai = direct(prompt)",
  "deploy --vps ubuntu",
  "bot.on('message', reply)",
  "<Section animate />",
  "useSyncExternalStore()",
  "npx create-portfolio",
  "groq.chat.completions",
  "nginx -s reload",
  "git push origin main",
  "ssh dhruv@dhruvdeveloper.me",
  "docker compose up -d",
  "npm run build → 5.6s",
  "certbot renew",
  "OK 200 → 18ms",
  "tailwind: aurora-violet",
  "framer-motion <motion.div/>",
];

// Deterministic pseudo-random so SSR/CSR markup matches
function seeded(i: number, salt = 1) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/* ------------------------------------------------------------------ */
/*  HeroGlobe — drop inside the Hero section                          */
/* ------------------------------------------------------------------ */

export function HeroGlobe() {
  const isWide = useIsWideViewport();
  const reduced = useReducedMotion();
  if (!isWide || reduced) return null;

  // 7 vertical meridians + 5 horizontal latitudes for a wireframe sphere
  const meridians = Array.from({ length: 7 }, (_, i) => {
    const t = i / 6;
    const rx = Math.abs(Math.cos(Math.PI * t)) * 220;
    return { rx, key: `m${i}` };
  });
  const latitudes = Array.from({ length: 5 }, (_, i) => {
    const t = (i + 1) / 6;
    const y = -220 + t * 440;
    const r = Math.sin(Math.PI * t) * 220;
    return { y, r, key: `l${i}` };
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 overflow-visible md:block"
    >
      {/* Aurora halo */}
      <div
        className="absolute"
        style={{
          right: "-8%",
          top: "8%",
          width: "min(640px, 70%)",
          height: "min(640px, 70%)",
          background:
            "radial-gradient(circle, rgb(var(--accent-violet)/0.28) 0%, rgb(var(--accent-pink)/0.14) 35%, transparent 65%)",
          filter: "blur(28px)",
        }}
      />

      {/* Wireframe sphere */}
      <motion.div
        className="absolute"
        style={{
          right: "-4%",
          top: "12%",
          width: "min(560px, 64%)",
          height: "min(560px, 64%)",
          willChange: "transform",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        <svg
          viewBox="-260 -260 520 520"
          width="100%"
          height="100%"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="hero-globe-stroke" x1="0" y1="0" x2="1" y2="1">
              <stop
                offset="0%"
                stopColor="rgb(var(--accent-violet))"
                stopOpacity="0.7"
              />
              <stop
                offset="55%"
                stopColor="rgb(var(--accent-pink))"
                stopOpacity="0.45"
              />
              <stop
                offset="100%"
                stopColor="rgb(var(--accent-amber))"
                stopOpacity="0.3"
              />
            </linearGradient>
          </defs>
          <circle
            cx="0"
            cy="0"
            r="220"
            fill="none"
            stroke="url(#hero-globe-stroke)"
            strokeWidth="0.9"
          />
          {meridians.map(({ rx, key }) => (
            <ellipse
              key={key}
              cx="0"
              cy="0"
              rx={Math.max(rx, 0.5)}
              ry="220"
              fill="none"
              stroke="url(#hero-globe-stroke)"
              strokeWidth="0.7"
              opacity="0.65"
            />
          ))}
          {latitudes.map(({ y, r, key }) => (
            <ellipse
              key={key}
              cx="0"
              cy={y}
              rx={r}
              ry={r * 0.18}
              fill="none"
              stroke="url(#hero-globe-stroke)"
              strokeWidth="0.7"
              opacity="0.65"
            />
          ))}
          <circle cx="0" cy="-220" r="3" fill="rgb(var(--accent-violet))" />
          <circle cx="0" cy="220" r="3" fill="rgb(var(--accent-amber))" />
        </svg>
      </motion.div>

      {/* Counter-rotating shimmer ring */}
      <motion.div
        className="absolute"
        style={{
          right: "-4%",
          top: "12%",
          width: "min(560px, 64%)",
          height: "min(560px, 64%)",
          willChange: "transform",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="-260 -260 520 520" width="100%" height="100%">
          <circle
            cx="0"
            cy="0"
            r="245"
            fill="none"
            stroke="rgb(var(--accent-violet))"
            strokeWidth="0.6"
            strokeOpacity="0.32"
            strokeDasharray="2 14"
          />
        </svg>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CodeRainBackground — fixed full-viewport drifting code snippets   */
/* ------------------------------------------------------------------ */

export function CodeRainBackground() {
  const isWide = useIsWideViewport();
  const reduced = useReducedMotion();

  const snippets = useMemo(
    () =>
      CODE_SNIPPETS.map((text, i) => ({
        text,
        left: seeded(i, 1) * 100,
        delay: seeded(i, 2) * 18,
        duration: 22 + seeded(i, 3) * 16,
        size: 11 + Math.floor(seeded(i, 4) * 4),
        hue: i % 3,
      })),
    [],
  );

  if (!isWide || reduced) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[2] overflow-hidden"
      style={{ contain: "strict" }}
    >
      {snippets.map((s, i) => {
        const colorVar =
          s.hue === 0
            ? "--accent-violet"
            : s.hue === 1
              ? "--accent-pink"
              : "--accent-amber";
        return (
          <motion.span
            key={i}
            className="absolute font-mono whitespace-nowrap"
            style={{
              left: `${s.left}%`,
              bottom: "-3rem",
              fontSize: `${s.size}px`,
              color: `rgb(var(${colorVar}) / 0.32)`,
              textShadow: `0 0 16px rgb(var(${colorVar}) / 0.2)`,
              willChange: "transform, opacity",
            }}
            animate={{
              y: ["0vh", "-110vh"],
              opacity: [0, 0.85, 0.85, 0],
            }}
            transition={{
              duration: s.duration,
              delay: s.delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.1, 0.85, 1],
            }}
          >
            {s.text}
          </motion.span>
        );
      })}
    </div>
  );
}
