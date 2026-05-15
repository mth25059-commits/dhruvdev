"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { SITE } from "@/lib/content";
import { HeroGlobe } from "@/components/code-globe";

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.4 },
  },
};

const lineVariants = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-6 pt-24 md:px-10 md:pt-32"
    >
      <div className="mesh-bg">
        <div className="blob-3" />
      </div>
      <HeroGlobe />
      <div className="noise absolute inset-0 -z-10" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        {/* Top meta row */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[rgb(var(--text-muted))] md:mb-16"
        >
          <span className="flex items-center gap-2">
            <span className="status-dot" />
            <span className="text-[rgb(var(--text-primary))]">
              {SITE.available ? "Available for work" : "Booked out"}
            </span>
            <span className="opacity-40">— 2026</span>
          </span>
          <span className="hidden md:inline">Portfolio · v1</span>
        </motion.div>

        {/* Tagline */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="font-display text-balance text-[clamp(2.75rem,9vw,9.5rem)] font-semibold leading-[0.92] tracking-[-0.04em]"
        >
          <span className="block overflow-hidden">
            <motion.span variants={lineVariants} className="inline-block">
              AI builds.
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span variants={lineVariants} className="inline-block">
              I direct.
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span variants={lineVariants} className="inline-block">
              The <span className="gradient-text-animated">internet</span>{" "}
              listens.
            </motion.span>
          </span>
        </motion.h1>

        {/* Sub + CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 1.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col gap-6 md:mt-16 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-xl text-pretty text-base text-[rgb(var(--text-muted))] md:text-lg">
            Dhruv Chandrawanshi — I ship websites, Telegram bots, and AI
            automations. Built fast, polished hard, deployed on my own metal.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-[rgb(var(--accent-violet))] px-6 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgb(var(--accent-violet)/0.55)] transition-all hover:gap-3 hover:shadow-[0_0_50px_rgb(var(--accent-violet)/0.9)]"
              data-cursor-hover
            >
              Get in touch
              <ArrowRight
                size={16}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-[rgb(var(--text-primary))] backdrop-blur-md transition-all hover:border-white/20"
              data-cursor-hover
            >
              See selected work
            </a>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-20 flex items-center justify-center md:justify-start"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))]"
            data-cursor-hover
          >
            <span>Scroll</span>
            <ArrowDown
              size={14}
              className="animate-bounce [animation-duration:2s]"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
