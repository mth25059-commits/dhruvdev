"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, ArrowUpRight, Check } from "lucide-react";

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.339 18.337V10.21H5.668v8.127H8.34Zm-1.334-9.245a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1Zm11.332 9.245v-4.522c0-2.42-1.296-3.547-3.025-3.547-1.394 0-2.02.77-2.367 1.31v-1.123h-2.626c.034.79 0 8.482 0 8.482h2.626v-4.587c0-.231.017-.462.085-.628.187-.461.61-.94 1.322-.94.932 0 1.305.7 1.305 1.726v4.43h2.68Z" />
    </svg>
  );
}
import { SITE } from "@/lib/content";
import { cn } from "@/lib/utils";

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

export function Contact() {
  const [state, setState] = useState<FormState>({ status: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.status === "submitting") return;
    setState({ status: "submitting" });

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      projectType: String(formData.get("projectType") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setState({ status: "error", message: "Please fill name, email and message." });
      return;
    }

    try {
      const res = await fetch(`${window.location.origin}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Something went wrong.");
      }
      setState({ status: "success" });
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Network error.";
      setState({ status: "error", message: msg });
    }
  }

  return (
    <section
      id="contact"
      className="relative border-t border-white/5 bg-[rgb(var(--bg-panel))] px-6 py-24 md:px-10 md:py-40"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[rgb(var(--text-muted))]">
            <span className="inline-block h-px w-8 bg-[rgb(var(--text-muted))]" />
            <span>Contact</span>
          </div>
          <p className="text-sm text-[rgb(var(--text-muted))] md:max-w-md">
            Got an idea? A site to refresh? A bot to deploy? Drop a line — I
            reply within a day.
          </p>
        </div>

        <h2 className="mt-8 font-display text-[clamp(2.5rem,8vw,8rem)] font-semibold leading-[0.95] tracking-[-0.035em] md:mt-12">
          Let&apos;s build
          <br />
          <span className="gradient-text-animated">something.</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-12 md:gap-16">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onSubmit={onSubmit}
            className="md:col-span-7"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Your name" name="name" placeholder="Jane Doe" />
              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="jane@company.com"
              />
              <div className="md:col-span-2">
                <Select
                  label="Project type"
                  name="projectType"
                  options={[
                    "Website",
                    "Telegram Bot",
                    "AI Automation",
                    "VPS / Hosting",
                    "Other",
                  ]}
                />
              </div>
            </div>
            <div className="mt-4">
              <Field
                label="Tell me about your project"
                name="message"
                placeholder="What are you building? Timeline? Anything that helps."
                textarea
              />
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="submit"
                disabled={state.status === "submitting"}
                className={cn(
                  "group inline-flex items-center gap-2 rounded-full bg-[rgb(var(--accent-violet))] px-7 py-3.5 text-sm font-medium text-white shadow-[0_0_30px_rgb(var(--accent-violet)/0.5)] transition-all hover:gap-3 hover:shadow-[0_0_50px_rgb(var(--accent-violet)/0.9)] disabled:opacity-50",
                )}
                data-cursor-hover
              >
                {state.status === "submitting"
                  ? "Sending…"
                  : state.status === "success"
                    ? "Sent ✓"
                    : "Send message"}
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
              {state.status === "error" && (
                <p className="text-sm text-red-400">{state.message}</p>
              )}
              {state.status === "success" && (
                <p className="flex items-center gap-2 text-sm text-emerald-400">
                  <Check size={14} /> Got it — I&apos;ll reply within a day.
                </p>
              )}
            </div>
            <p className="mt-3 text-xs text-[rgb(var(--text-muted))]">
              Messages land in my Telegram instantly.
            </p>
          </motion.form>

          {/* Direct contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="md:col-span-5"
          >
            <div className="text-xs uppercase tracking-[0.18em] text-[rgb(var(--text-muted))]">
              Or reach out directly
            </div>
            <ul className="mt-6 flex flex-col gap-3">
              <ContactLink
                href={`mailto:${SITE.email}`}
                icon={<Mail size={16} />}
                label="Email"
                value={SITE.email}
              />
              <ContactLink
                href={SITE.whatsappLink}
                icon={<MessageCircle size={16} />}
                label="WhatsApp"
                value={SITE.whatsappDisplay}
                external
              />
              <ContactLink
                href={SITE.linkedin}
                icon={<LinkedInIcon size={16} />}
                label="LinkedIn"
                value="@dhruv-chandrawanshi"
                external
              />
            </ul>
            <div className="mt-8 rounded-2xl border border-white/8 bg-[rgb(var(--bg-base))] p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-[rgb(var(--text-muted))]">
                Response time
              </div>
              <div className="mt-2 font-display text-2xl font-semibold">
                Within 24 hours
              </div>
              <p className="mt-1 text-sm text-[rgb(var(--text-muted))]">
                IST · Mon–Sat · Same day if urgent
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  textarea,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
}) {
  const baseClass =
    "peer w-full rounded-2xl border border-white/10 bg-[rgb(var(--bg-base))] px-5 py-4 text-sm text-[rgb(var(--text-primary))] placeholder-transparent outline-none transition-all focus:border-[rgb(var(--accent-violet)/0.6)] focus:shadow-[0_0_0_4px_rgb(var(--accent-violet)/0.15)]";
  const labelClass =
    "pointer-events-none absolute left-5 top-4 origin-left text-sm text-[rgb(var(--text-muted))] transition-all peer-focus:-translate-y-2 peer-focus:scale-75 peer-focus:text-[rgb(var(--accent-violet))] peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:scale-75";

  return (
    <label className="relative block">
      {textarea ? (
        <textarea
          name={name}
          rows={5}
          placeholder={placeholder ?? " "}
          className={baseClass + " resize-none pt-6"}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder ?? " "}
          className={baseClass + " pt-6"}
        />
      )}
      <span className={labelClass}>{label}</span>
    </label>
  );
}

function Select({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="relative block">
      <select
        name={name}
        defaultValue=""
        className="w-full appearance-none rounded-2xl border border-white/10 bg-[rgb(var(--bg-base))] px-5 pt-6 pb-3 text-sm text-[rgb(var(--text-primary))] outline-none transition-all focus:border-[rgb(var(--accent-violet)/0.6)] focus:shadow-[0_0_0_4px_rgb(var(--accent-violet)/0.15)]"
      >
        <option value="" disabled hidden></option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute left-5 top-2 text-xs text-[rgb(var(--text-muted))]">
        {label}
      </span>
      <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[rgb(var(--text-muted))]">
        ▾
      </span>
    </label>
  );
}

function ContactLink({
  href,
  icon,
  label,
  value,
  external,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex items-center justify-between rounded-2xl border border-white/8 bg-[rgb(var(--bg-base))] px-5 py-4 transition-all hover:border-[rgb(var(--accent-violet)/0.5)] hover:bg-[rgb(var(--bg-elevated))]"
        data-cursor-hover
      >
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white/5 text-[rgb(var(--text-muted))]">
            {icon}
          </span>
          <div>
            <div className="text-xs uppercase tracking-[0.15em] text-[rgb(var(--text-muted))]">
              {label}
            </div>
            <div className="text-sm font-medium">{value}</div>
          </div>
        </div>
        <ArrowUpRight
          size={16}
          className="text-[rgb(var(--text-muted))] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[rgb(var(--text-primary))]"
        />
      </a>
    </li>
  );
}
