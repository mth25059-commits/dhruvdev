import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
};

function escape(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const name = (body.name ?? "").trim().slice(0, 200);
  const email = (body.email ?? "").trim().slice(0, 200);
  const projectType = (body.projectType ?? "").trim().slice(0, 100);
  const message = (body.message ?? "").trim().slice(0, 4000);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 400 },
    );
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  const token = process.env.DHRUV_PORTFOLIO_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return NextResponse.json(
      { error: "Server not configured." },
      { status: 500 },
    );
  }

  const text = [
    "🎯 <b>New portfolio enquiry</b>",
    "",
    `<b>Name:</b> ${escape(name)}`,
    `<b>Email:</b> ${escape(email)}`,
    projectType ? `<b>Project:</b> ${escape(projectType)}` : "",
    "",
    "<b>Message:</b>",
    escape(message),
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
        cache: "no-store",
      },
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("Telegram API error:", errText);
      return NextResponse.json(
        { error: "Couldn't deliver message. Try email instead." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Network error. Try email instead." },
      { status: 500 },
    );
  }
}
