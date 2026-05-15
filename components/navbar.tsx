"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { Logo } from "@/components/logo";
import { NAV_LINKS } from "@/lib/content";
import { useTheme } from "@/components/providers/theme-provider";
import { useActiveSection } from "@/lib/use-active-section";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  const sectionIds = useMemo(
    () => NAV_LINKS.map((l) => l.href.replace(/^#/, "")),
    [],
  );
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-6 py-4 md:px-10">
      <div
        className={cn(
          "mx-auto flex max-w-[1400px] items-center justify-between rounded-full border border-white/5 px-4 py-2 transition-all duration-500 md:px-6",
          scrolled
            ? "bg-[rgb(var(--bg-base)/0.7)] backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <Logo showWordmark />

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace(/^#/, "");
            const isActive = active === id;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group relative rounded-full px-4 py-2 text-sm transition-colors",
                  isActive
                    ? "text-[rgb(var(--text-primary))]"
                    : "text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))]",
                )}
                data-cursor-hover
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    aria-hidden
                    className="absolute inset-0 -z-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(120deg, rgb(var(--accent-violet)/0.35) 0%, rgb(var(--accent-pink)/0.3) 50%, rgb(var(--accent-amber)/0.28) 100%)",
                      boxShadow:
                        "0 0 24px -8px rgb(var(--accent-violet)/0.55), inset 0 0 0 1px rgb(255 255 255 / 0.08)",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
                {!isActive && (
                  <span className="absolute inset-0 -z-0 rounded-full bg-white/0 transition-colors group-hover:bg-white/5" />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:border-[rgb(var(--accent-violet)/0.5)]"
            data-cursor-hover
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "dark" ? (
                <motion.span
                  key="moon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="inline-flex"
                >
                  <Moon size={15} strokeWidth={1.8} />
                </motion.span>
              ) : (
                <motion.span
                  key="sun"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="inline-flex"
                >
                  <Sun size={15} strokeWidth={1.8} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <a
            href="#contact"
            className="hidden rounded-full bg-[rgb(var(--accent-violet))] px-4 py-2 text-sm font-medium text-white shadow-[0_0_20px_rgb(var(--accent-violet)/0.5)] transition-all hover:shadow-[0_0_30px_rgb(var(--accent-violet)/0.8)] md:inline-flex"
            data-cursor-hover
          >
            Let&apos;s talk →
          </a>
        </div>
      </div>
    </header>
  );
}
