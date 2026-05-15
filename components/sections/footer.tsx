"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { SITE } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[rgb(var(--bg-base))] px-6 pt-16 pb-8 md:px-10 md:pt-24">
      <div className="mx-auto w-full max-w-[1400px]">
        {/* Giant name — sized so "Chandrawanshi" (longest line) always fits.
            12 chars wide ≈ 0.52em per char in our display font, so we cap
            the font size at viewport-width / 7 to guarantee no clip. */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <h2 className="font-display select-none text-balance text-[clamp(2.5rem,11.5vw,12rem)] font-bold leading-[0.88] tracking-[-0.045em]">
            <span className="gradient-text-animated">Dhruv</span>
            <br />
            <span className="block">Chandrawanshi</span>
          </h2>
          <a
            href="#top"
            aria-label="Back to top"
            className="absolute right-0 top-2 grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:border-[rgb(var(--accent-violet)/0.5)] hover:bg-[rgb(var(--accent-violet)/0.1)] md:h-14 md:w-14"
            data-cursor-hover
          >
            <ArrowUp size={18} />
          </a>
        </motion.div>

        {/* Credits row */}
        <div className="mt-12 grid grid-cols-1 gap-6 border-t border-white/5 pt-8 text-sm text-[rgb(var(--text-muted))] md:grid-cols-3">
          <div>
            <div className="text-xs uppercase tracking-[0.16em]">Built with</div>
            <div className="mt-2 font-mono text-xs">
              Next.js · Tailwind · Framer Motion · GSAP · Lenis
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.16em]">Hosted on</div>
            <div className="mt-2 font-mono text-xs">
              Ubuntu VPS · Nginx · Docker · 100 GB · 1 GB RAM
            </div>
          </div>
          <div className="md:text-right">
            <div className="text-xs uppercase tracking-[0.16em]">© 2026</div>
            <div className="mt-2 font-mono text-xs">{SITE.domain}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
