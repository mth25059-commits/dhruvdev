"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/content";
import { cn } from "@/lib/utils";

const accentMap: Record<Project["accent"], string> = {
  violet: "from-[rgb(var(--accent-violet))] via-[rgb(var(--accent-pink))] to-transparent",
  pink: "from-[rgb(var(--accent-pink))] via-[rgb(var(--accent-amber))] to-transparent",
  amber: "from-[rgb(var(--accent-amber))] via-[rgb(var(--accent-pink))] to-transparent",
  cyan: "from-[rgb(var(--accent-cyan))] via-[rgb(var(--accent-violet))] to-transparent",
};

export function SelectedWork() {
  return (
    <section
      id="work"
      className="relative px-6 py-24 md:px-10 md:py-40"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <Header />
        <div className="mt-16 flex flex-col gap-24 md:mt-24 md:gap-40">
          {PROJECTS.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[rgb(var(--text-muted))]">
        <span className="inline-block h-px w-8 bg-[rgb(var(--text-muted))]" />
        <span>Selected work · 2025</span>
      </div>
      <h2 className="font-display text-balance text-[clamp(2rem,5.5vw,4.5rem)] font-semibold leading-[1] tracking-[-0.03em] md:max-w-[18ch]">
        Real sites I&apos;ve shipped — built with AI,
        <span className="gradient-text"> hand-polished.</span>
      </h2>
    </div>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const isReverse = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12",
      )}
    >
      {/* Image card */}
      <motion.a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group relative col-span-1 block overflow-hidden rounded-3xl border border-white/10 bg-[rgb(var(--bg-panel))] md:col-span-7",
          isReverse && "md:order-2",
        )}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        data-cursor-hover
      >
        <div className={cn("absolute -inset-px rounded-3xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100", accentMap[project.accent])} />
        <motion.div className="relative aspect-[16/10]" style={{ y: imgY }}>
          <Image
            src={`/projects/${project.id}.png`}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 768px) 56vw, 100vw"
            className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.04]"
            priority={index === 0}
          />
          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          {/* Hover label */}
          <div className="pointer-events-none absolute inset-0 flex items-end justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:p-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-medium uppercase tracking-wider text-black backdrop-blur-md">
              Visit live <ArrowUpRight size={14} />
            </span>
          </div>
        </motion.div>
      </motion.a>

      {/* Meta */}
      <div className={cn("col-span-1 flex flex-col gap-4 md:col-span-5", isReverse && "md:order-1")}>
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[rgb(var(--text-muted))]">
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
            {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
          </span>
          <span>{project.year}</span>
        </div>
        <h3 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-[1] tracking-[-0.03em]">
          {project.title}
        </h3>
        <p className="text-sm uppercase tracking-[0.15em] text-[rgb(var(--text-muted))]">
          {project.type}
        </p>
        <p className="text-pretty text-base text-[rgb(var(--text-muted))] md:text-lg">
          {project.description}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          {project.stack.split(" · ").map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-[rgb(var(--text-muted))]"
            >
              {s}
            </span>
          ))}
        </div>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-3 inline-flex w-fit items-center gap-2 text-sm font-medium text-[rgb(var(--text-primary))] hover:gap-3 transition-all"
          data-cursor-hover
        >
          <span className="relative">
            View live site
            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[rgb(var(--accent-violet))] to-[rgb(var(--accent-pink))] transition-transform duration-500 group-hover:scale-x-100" />
          </span>
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </motion.div>
  );
}
