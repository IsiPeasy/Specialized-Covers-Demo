// QA screenshots: `/`, then per style home, shapes, admin and configure?step=0..4,
// at 1440×900 and 390×844, into qa/screenshots/. Also reports horizontal overflow and console errors.
// Usage: npm run build && npx serve out -l 4173 (or any static server) → node qa/shoot.mjs [style…]
// BASE_URL overrides http://localhost:4173.
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = process.env.BASE_URL ?? "http://localhost:4173";
const ALL = ["atelier", "showroom", "paddock", "pattern-room"];
const styles = process.argv.slice(2).filter((a) => ALL.includes(a));
const VIEWPORTS = [{ name: "desktop", width: 1440, height: 900 }, { name: "mobile", width: 390, height: 844 }];
const OUT = new URL("./screenshots/", import.meta.url).pathname;

const pages = [{ id: "landing", path: "/" }];
for (const s of styles.length ? styles : ALL) {
  pages.push({ id: `${s}-home`, path: `/${s}/`, full: true });
  pages.push({ id: `${s}-shapes`, path: `/${s}/shapes/` });
  pages.push({ id: `${s}-admin`, path: `/${s}/admin/` });
  for (let i = 0; i < 5; i++) pages.push({ id: `${s}-configure-${i}`, path: `/${s}/configure/?step=${i}`, full: true });
}

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const problems = [];
for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => problems.push(`[${vp.name}] ${page.url()} pageerror: ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error") problems.push(`[${vp.name}] ${page.url()} console: ${m.text()}`); });
  for (const p of pages) {
    await page.goto(BASE + p.path, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(2200); // let entrance animations settle
    const over = await page.evaluate(() => {
      const w = document.documentElement.clientWidth;
      const wide = [...document.querySelectorAll("body *")].filter((el) => { const r = el.getBoundingClientRect(); return r.right > w + 1 && getComputedStyle(el).position !== "fixed"; });
      return { scroll: document.documentElement.scrollWidth - w, sample: wide.slice(0, 3).map((el) => el.tagName.toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.split(" ").slice(0, 3).join(".") : "")) };
    });
    if (over.scroll > 0) problems.push(`[${vp.name}] ${p.path} horizontal overflow ${over.scroll}px: ${over.sample.join(" | ")}`);
    await page.screenshot({ path: `${OUT}${p.id}-${vp.name}.png`, fullPage: !!p.full && vp.name === "mobile" ? true : !!p.full });
  }
  await ctx.close();
}
await browser.close();
console.log(problems.length ? problems.join("\n") : "No overflow or console errors.");
console.log(`Screenshots in ${OUT}`);
