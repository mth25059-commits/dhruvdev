import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

const SYSTEM_PROMPT = `You are Dhruv's AI assistant — a friendly concierge for Dhruv Chandrawanshi's portfolio site at dhruvdeveloper.me.

ABOUT DHRUV:
- Indie builder based in India.
- Ships websites, Telegram bots, and AI automations end-to-end.
- Doesn't write code line by line — directs AI tools (Cursor, Claude, v0, ChatGPT) to build, test, and ship.
- Hosts on his own Ubuntu VPS (Docker + Nginx + Cloudflare) or Vercel.
- Available worldwide. Shipping since 2024.

SERVICES:
1. Websites — AI-built, hand-polished, production-ready.
2. Telegram Bots — payment flows, AI replies, scraping, broadcasts, webhooks.
3. AI Automation — n8n, Make, custom Python pipelines.
4. VPS Setup & Hosting — provision, secure, deploy, SSL, monitoring.

CONTACT:
- Email: dxruxx@gmail.com
- WhatsApp: +91 95406 93239
- LinkedIn: dhruv-chandrawanshi

TONE: Confident, concise, friendly. Reply in 1-3 short sentences max. Use plain English (mix of Hindi/Hinglish is fine if the user starts in that language). Push toward the contact form or WhatsApp for serious enquiries. Never make up facts you don't know — say "let me check with Dhruv directly" and suggest emailing.

DO NOT:
- Pretend to be Dhruv himself. You are his assistant.
- Quote prices unless asked — say "starts under $500 for simple sites, depends on scope".
- Discuss anything off-topic for too long; gently steer back to Dhruv's work.`;

export async function POST(request: Request) {
  let body: { messages?: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length === 0) {
    return NextResponse.json(
      { error: "messages array required." },
      { status: 400 },
    );
  }

  // Limit history (last 12) and trim each message to a safe length
  const trimmed = messages
    .slice(-12)
    .filter(
      (m): m is ChatMessage =>
        typeof m?.content === "string" &&
        (m.role === "user" || m.role === "assistant"),
    )
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, 2000),
    }));

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI not configured on the server." },
      { status: 500 },
    );
  }

  try {
    const res = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          temperature: 0.55,
          max_tokens: 350,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...trimmed,
          ],
        }),
        cache: "no-store",
      },
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("Groq API error:", errText);
      return NextResponse.json(
        { error: "AI is taking a break. Try email instead." },
        { status: 502 },
      );
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const reply =
      data.choices?.[0]?.message?.content?.trim() ??
      "Hmm, I didn't quite catch that. Try rephrasing?";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { error: "Network error. Try emailing Dhruv directly." },
      { status: 500 },
    );
  }
}
