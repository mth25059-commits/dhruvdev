"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";

type Msg = { role: "user" | "bot"; text: string };

const CONVERSATION: Msg[] = [
  { role: "user", text: "/start" },
  { role: "bot", text: "Hey! I'm Dhruv's bot 🤖\nWhat do you need today?" },
  { role: "user", text: "Set up a payment flow" },
  { role: "bot", text: "Got it. Razorpay or Stripe?" },
  { role: "user", text: "Razorpay" },
  { role: "bot", text: "Done. Generating invoice link…" },
  { role: "bot", text: "✓ Live: razorpay.com/p/inv_84d2" },
];

export function TelegramMock() {
  const [visible, setVisible] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function play() {
      // Reset between loops (state setters inside a normal callback path are fine here).
      setVisible([]);
      for (let i = 0; i < CONVERSATION.length; i++) {
        if (cancelled) return;
        const msg = CONVERSATION[i];
        if (msg.role === "bot") {
          setTyping(true);
          await wait(900);
          if (cancelled) return;
          setTyping(false);
        } else {
          await wait(700);
          if (cancelled) return;
        }
        setVisible((prev) => [...prev, msg]);
        await wait(700);
      }
      await wait(2200);
      if (!cancelled) play();
    }

    const t = setTimeout(play, 600);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      {/* Phone frame */}
      <div className="relative mx-auto h-full max-h-[520px] w-full max-w-[300px] rounded-[36px] border border-white/15 bg-gradient-to-br from-zinc-900 to-zinc-950 p-2 shadow-2xl">
        <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-[#0e1a26]">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-white/5 bg-[#17212b] px-4 py-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[rgb(var(--accent-violet))] to-[rgb(var(--accent-pink))] text-sm font-bold text-white">
              D
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-semibold text-white">
                Dhruv&apos;s Bot
              </div>
              <div className="flex items-center gap-1 text-[10px] text-emerald-400">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                online
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex flex-col gap-2 p-3 pt-4">
            <AnimatePresence initial={false}>
              {visible.map((m, i) => (
                <motion.div
                  key={`${i}-${m.text}`}
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`max-w-[80%] whitespace-pre-line rounded-2xl px-3 py-2 text-[12px] leading-snug ${
                    m.role === "user"
                      ? "self-end rounded-br-md bg-gradient-to-br from-[#2b5278] to-[#1e3a52] text-white"
                      : "self-start rounded-bl-md bg-[#182533] text-zinc-100"
                  }`}
                >
                  {m.text}
                </motion.div>
              ))}
            </AnimatePresence>
            {typing && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="self-start rounded-2xl rounded-bl-md bg-[#182533] px-3 py-2"
              >
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div className="absolute inset-x-0 bottom-0 border-t border-white/5 bg-[#17212b] px-3 py-2">
            <div className="flex items-center gap-2 rounded-full bg-[#242f3d] px-3 py-1.5">
              <input
                readOnly
                placeholder="Message"
                tabIndex={-1}
                className="flex-1 bg-transparent text-[11px] text-white placeholder:text-white/40 outline-none"
              />
              <button
                tabIndex={-1}
                className="grid h-7 w-7 place-items-center rounded-full bg-[#5288c1] text-white"
              >
                <Send size={12} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function wait(ms: number) {
  return new Promise<void>((res) => setTimeout(res, ms));
}
