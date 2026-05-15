// Capture screenshots of our own dev site at multiple widths.
// Run: node scripts/capture-self.mjs
import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";

const outDir = path.resolve("docs/screenshots");
fs.mkdirSync(outDir, { recursive: true });

const SHOTS = [
  // Desktop hero + scroll positions
  { name: "desktop-hero", viewport: { width: 1440, height: 900 }, scrollTo: 0 },
  { name: "desktop-work", viewport: { width: 1440, height: 900 }, scrollToSelector: "#work" },
  { name: "desktop-stack", viewport: { width: 1440, height: 900 }, scrollToSelector: "#stack" },
  { name: "desktop-services", viewport: { width: 1440, height: 900 }, scrollToSelector: "#services" },
  { name: "desktop-about", viewport: { width: 1440, height: 900 }, scrollToSelector: "#about" },
  { name: "desktop-contact", viewport: { width: 1440, height: 900 }, scrollToSelector: "#contact" },
  // Light mode
  {
    name: "desktop-light",
    viewport: { width: 1440, height: 900 },
    setup: async (page) => {
      await page.evaluate(() => {
        localStorage.setItem("dhruvdev-theme", "light");
      });
    },
  },
  // Mobile
  { name: "mobile-hero", viewport: { width: 390, height: 844 }, scrollTo: 0, isMobile: true },
  { name: "mobile-work", viewport: { width: 390, height: 844 }, scrollToSelector: "#work", isMobile: true },
  { name: "mobile-services", viewport: { width: 390, height: 844 }, scrollToSelector: "#services", isMobile: true },
];

const browser = await chromium.launch();

for (const shot of SHOTS) {
  const ctx = await browser.newContext({
    viewport: shot.viewport,
    deviceScaleFactor: shot.isMobile ? 2 : 1,
    hasTouch: !!shot.isMobile,
  });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });

  if (shot.setup) {
    await shot.setup(page);
    await page.reload({ waitUntil: "domcontentloaded" });
  }

  // Let animations settle
  await page.waitForTimeout(1500);

  if (shot.scrollToSelector) {
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
    }, shot.scrollToSelector);
    await page.waitForTimeout(1200);
  } else if (typeof shot.scrollTo === "number") {
    await page.evaluate((y) => window.scrollTo(0, y), shot.scrollTo);
    await page.waitForTimeout(500);
  }

  const file = path.join(outDir, `${shot.name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log(`  → ${file}`);
  await ctx.close();
}

await browser.close();
console.log("Done.");
