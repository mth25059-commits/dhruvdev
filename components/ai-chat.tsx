"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Send, X, Sparkles } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const INITIAL_GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Hey, I'm Dhruv's AI assistant ✨\nAsk me anything about his work, services, or how to start a project.",
};

const SUGGESTIONS = [
  "What does Dhruv build?",
  "How fast can you ship a site?",
  "Can you make a Telegram bot?",
];

export function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  async function send(text: string) {
    const userMsg: ChatMessage = { role: "user", content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    try {
      // Build an absolute URL via window.location.origin (which never includes
      // any basic-auth credentials in the URL) so fetch() doesn't reject the
      // request when previewed behind a tunnel like https://user:pass@host.
      const endpoint = `${window.location.origin}/api/chat`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Couldn't reach the AI right now.");
      }
      const data = (await res.json()) as { reply: string };
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Network error.";
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `Couldn't reach the AI — ${msg}\nMessage Dhruv directly: dxruxx@gmail.com`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    send(trimmed);
  }

  return (
    <>
      {/* Floating launcher */}
      <motion.button
        aria-label="Open AI chat"
        onClick={() => setOpen((v) => !v)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[rgb(var(--accent-violet))] via-[rgb(var(--accent-pink))] to-[rgb(var(--accent-amber))] text-white shadow-[0_0_30px_rgb(var(--accent-violet)/0.6)] transition-transform hover:scale-105 md:bottom-6 md:right-6 md:h-16 md:w-16"
        data-cursor-hover
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} strokeWidth={2.2} />
            </motion.span>
          ) : (
            <motion.span
              key="msg"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare size={22} strokeWidth={2.2} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 bottom-24 z-40 md:left-auto md:right-6 md:bottom-28 md:w-[380px]"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[rgb(var(--bg-panel))]/95 shadow-2xl backdrop-blur-2xl">
              {/* Gradient ring */}
              <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-[rgb(var(--accent-violet)/0.5)] via-[rgb(var(--accent-pink)/0.3)] to-transparent opacity-50" />
              <div className="relative">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[rgb(var(--accent-violet))] via-[rgb(var(--accent-pink))] to-[rgb(var(--accent-amber))]">
                      <Sparkles size={14} className="text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">
                        Ask Dhruv&apos;s AI
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        <span>powered by Groq · instant replies</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close chat"
                    className="grid h-8 w-8 place-items-center rounded-full text-[rgb(var(--text-muted))] transition-colors hover:bg-white/5 hover:text-[rgb(var(--text-primary))]"
                    data-cursor-hover
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Messages */}
                <div
                  ref={scrollRef}
                  className="flex h-[380px] flex-col gap-3 overflow-y-auto px-5 py-4"
                  style={{ scrollbarWidth: "none" }}
                >
                  {messages.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-snug ${
                        m.role === "user"
                          ? "self-end rounded-br-md bg-[rgb(var(--accent-violet))] text-white"
                          : "self-start rounded-bl-md bg-white/5 text-[rgb(var(--text-primary))]"
                      }`}
                    >
                      {m.content}
                    </motion.div>
                  ))}
                  {loading && (
                    <div className="self-start rounded-2xl rounded-bl-md bg-white/5 px-4 py-2.5">
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                    </div>
                  )}
                  {messages.length === 1 && !loading && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          onClick={() => send(s)}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[rgb(var(--text-muted))] transition-colors hover:border-[rgb(var(--accent-violet)/0.5)] hover:text-[rgb(var(--text-primary))]"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Input */}
                <form
                  onSubmit={onSubmit}
                  className="flex items-center gap-2 border-t border-white/5 px-3 py-3"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything…"
                    className="flex-1 rounded-full bg-white/5 px-4 py-2.5 text-sm text-[rgb(var(--text-primary))] outline-none transition-colors placeholder:text-[rgb(var(--text-muted))] focus:bg-white/8"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    aria-label="Send"
                    className="grid h-10 w-10 place-items-center rounded-full bg-[rgb(var(--accent-violet))] text-white shadow-[0_0_20px_rgb(var(--accent-violet)/0.5)] transition-all hover:bg-[rgb(var(--accent-pink))] disabled:opacity-40"
                    data-cursor-hover
                  >
                    <Send size={14} />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
