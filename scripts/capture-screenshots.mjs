// Capture portfolio site screenshots. Run with: node scripts/capture-screenshots.mjs
import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";

const SITES = [
  { id: "dema", url: "https://dema-gamma.vercel.app/" },
  { id: "vivek", url: "https://dr-vivek-gogia.vercel.app/" },
  { id: "petvet", url: "https://petvet-lilac.vercel.app/" },
];

const outDir = path.resolve("public/projects");
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1600, height: 1000 },
  deviceScaleFactor: 1,
});

for (const site of SITES) {
  console.log(`Capturing ${site.id} from ${site.url}`);
  const page = await ctx.newPage();
  try {
    await page.goto(site.url, { waitUntil: "networkidle", timeout: 30000 });
  } catch (err) {
    console.warn(`networkidle timed out for ${site.id}, falling back…`, err.message);
    try {
      await page.goto(site.url, { waitUntil: "load", timeout: 30000 });
    } catch (err2) {
      console.error(`Failed to load ${site.url}`, err2.message);
      await page.close();
      continue;
    }
  }
  // Let lazy assets / animations settle
  await page.waitForTimeout(2200);
  const file = path.join(outDir, `${site.id}.png`);
  await page.screenshot({
    path: file,
    clip: { x: 0, y: 0, width: 1600, height: 1000 },
    type: "png",
  });
  console.log(`  → ${file}`);
  await page.close();
}

await browser.close();
console.log("Done.");
