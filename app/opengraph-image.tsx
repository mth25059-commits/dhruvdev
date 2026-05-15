import { ImageResponse } from "next/og";
import { SITE } from "@/lib/content";

export const runtime = "edge";
export const alt = `${SITE.name} portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(at 20% 30%, #7C3AED 0%, transparent 50%), radial-gradient(at 80% 70%, #EC4899 0%, transparent 50%), #0A0A0F",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 28,
            opacity: 0.7,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              background: "#22c55e",
              borderRadius: 999,
              display: "flex",
            }}
          />
          {SITE.domain}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div
            style={{
              fontSize: 100,
              fontWeight: 600,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>AI builds.</span>
            <span>I direct.</span>
            <span
              style={{
                background:
                  "linear-gradient(90deg, #7C3AED, #EC4899, #F59E0B)",
                backgroundClip: "text",
                color: "transparent",
                display: "flex",
              }}
            >
              The internet listens.
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 32,
            opacity: 0.85,
          }}
        >
          <span>{SITE.name}</span>
          <span style={{ display: "flex", opacity: 0.6, fontSize: 24 }}>
            Web · Bots · AI Automation
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
