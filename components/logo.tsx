"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type LogoProps = {
  size?: number;
  showWordmark?: boolean;
  className?: string;
};

/**
 * "D" monogram with gradient stroke + path-draw on mount.
 * Renders pure SVG — works in both themes.
 */
export function Logo({ size = 36, showWordmark = false, className }: LogoProps) {
  return (
    <motion.a
      href="#top"
      aria-label="Dhruv — back to top"
      className={cn(
        "group inline-flex items-center gap-2 select-none",
        className,
      )}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="rgb(var(--accent-violet))" />
            <stop offset="55%" stopColor="rgb(var(--accent-pink))" />
            <stop offset="100%" stopColor="rgb(var(--accent-amber))" />
          </linearGradient>
        </defs>
        {/* Outer rounded square */}
        <motion.rect
          x="2"
          y="2"
          width="36"
          height="36"
          rx="10"
          stroke="url(#logo-grad)"
          strokeWidth="2"
          className="logo-path"
        />
        {/* "D" shape */}
        <motion.path
          d="M13 11 H21 C26.5 11 30 14.5 30 20 C30 25.5 26.5 29 21 29 H13 Z"
          stroke="url(#logo-grad)"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="transparent"
          className="logo-path"
          style={{ animationDelay: "0.4s" }}
        />
      </svg>
      {showWordmark && (
        <span className="font-display text-base font-semibold tracking-tight">
          dhruv<span className="opacity-50">.dev</span>
        </span>
      )}
    </motion.a>
  );
}
