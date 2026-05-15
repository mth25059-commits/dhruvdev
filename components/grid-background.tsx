"use client";

import { useEffect, useRef } from "react";
import { useIsDesktop } from "@/lib/use-media-query";

/**
 * Interactive dotted grid that brightens around the cursor (PC only).
 * Uses a CSS radial mask driven by mouse coords — no canvas, no per-dot DOM.
 */
export function GridBackground() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!isDesktop || !ref.current) return;
    const el = ref.current;
    let rafId = 0;
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let curX = lastX;
    let curY = lastY;

    const onMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const tick = () => {
      // Easing toward cursor for buttery feel
      curX += (lastX - curX) * 0.12;
      curY += (lastY - curY) * 0.12;
      el.style.setProperty("--mx", `${curX}px`);
      el.style.setProperty("--my", `${curY}px`);
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, [isDesktop]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        // Two layered backgrounds: subtle base grid + bright spotlight grid masked by radial gradient
        backgroundImage: `
          radial-gradient(
            600px circle at var(--mx, 50%) var(--my, 50%),
            rgb(var(--grid-glow)) 0%,
            transparent 70%
          ),
          radial-gradient(circle at 1px 1px, rgb(var(--grid-line)) 1px, transparent 0),
          radial-gradient(circle at 1px 1px, rgb(var(--grid-line)) 1px, transparent 0)
        `,
        backgroundSize: "auto, 32px 32px, 32px 32px",
        maskImage:
          "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), black 0%, black 30%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.2) 100%)",
        WebkitMaskImage:
          "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), black 0%, black 30%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.2) 100%)",
      }}
    />
  );
}
