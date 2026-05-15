"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Cpu, MemoryStick, HardDrive, Globe } from "lucide-react";

type Stat = { label: string; value: number; icon: typeof Cpu; color: string };

const TERMINAL_LINES = [
  "$ ssh dhruv@dhruvdeveloper.me",
  "Welcome to Ubuntu 24.04 LTS",
  "$ docker compose up -d",
  "✓ nginx          Running",
  "✓ portfolio      Running",
  "✓ tg-bot         Running",
  "✓ certbot        Renewed (89d)",
  "$ curl https://dhruvdeveloper.me",
  "HTTP/2 200  ↳ 18ms",
  "$ uptime",
  "up 42 days, 0.04 load",
];

export function VpsMock() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % 1000), 1400);
    return () => clearInterval(id);
  }, []);

  const stats: Stat[] = [
    {
      label: "CPU",
      value: 8 + ((tick * 7) % 20),
      icon: Cpu,
      color: "rgb(var(--accent-violet))",
    },
    {
      label: "RAM",
      value: 30 + ((tick * 5) % 12),
      icon: MemoryStick,
      color: "rgb(var(--accent-pink))",
    },
    {
      label: "Disk",
      value: 22,
      icon: HardDrive,
      color: "rgb(var(--accent-amber))",
    },
    {
      label: "Net",
      value: 60 + ((tick * 11) % 25),
      icon: Globe,
      color: "rgb(var(--accent-cyan))",
    },
  ];

  return (
    <div className="relative h-full w-full">
      <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a13] p-4 shadow-2xl md:p-5">
        {/* macOS-style title bar */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            dhruv@vps:~
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
            <Activity size={10} className="animate-pulse" />
            live
          </div>
        </div>

        {/* Stats grid */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/50">
                  <s.icon size={10} style={{ color: s.color }} />
                  {s.label}
                </div>
                <div
                  className="font-mono text-xs font-semibold tabular-nums"
                  style={{ color: s.color }}
                >
                  {s.value}%
                </div>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: s.color }}
                  animate={{ width: `${s.value}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Terminal */}
        <div className="mt-3 rounded-lg border border-white/5 bg-black/40 p-3 font-mono text-[10.5px] leading-relaxed">
          {TERMINAL_LINES.map((line, i) => (
            <motion.div
              key={`${i}-${tick % 11 === i ? "k" : ""}`}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`whitespace-pre ${
                line.startsWith("$")
                  ? "text-emerald-400"
                  : line.startsWith("✓")
                    ? "text-emerald-300/90"
                    : line.startsWith("HTTP")
                      ? "text-[rgb(var(--accent-amber))]"
                      : "text-white/60"
              }`}
            >
              {line}
              {i === TERMINAL_LINES.length - 1 && (
                <span className="ml-1 inline-block h-3 w-1.5 animate-pulse bg-emerald-400 align-middle" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom: live deploy */}
        <div className="mt-3 flex items-center justify-between rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
          <div className="text-[10px] uppercase tracking-widest text-emerald-300">
            Last deploy
          </div>
          <div className="font-mono text-[10px] text-emerald-200">
            2m ago · 18ms TTFB
          </div>
        </div>
      </div>
    </div>
  );
}
