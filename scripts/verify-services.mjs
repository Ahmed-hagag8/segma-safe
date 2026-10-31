/* Services "Ignition Sequence" verification — real desktop + mobile contexts.
   agent-browser emulates a coarse pointer, so hover-gated styles can't be
   verified there; this script uses plain Playwright desktop contexts. */
import { createRequire } from "module";
const require = createRequire("/home/z/.npm-global/lib/node_modules/");
const { chromium } = require("playwright");

const EXE = "/home/z/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome";
const URL = "http://localhost:3000";
const shot = (n) => `/tmp/render/${n}.png`;

const browser = await chromium.launch({ executablePath: EXE });

async function scrollToShowServices(page, extra = 0) {
  await page.evaluate((extra) => {
    const s = document.getElementById("services");
    window.scrollTo({ top: s.offsetTop + extra, behavior: "instant" });
  }, extra);
}

/* ── desktop, Arabic (default) ─────────────────────────────────────── */
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle" });

console.log(
  "desktop media:",
  await page.evaluate(() => ({
    hover: matchMedia("(hover: hover)").matches,
    fine: matchMedia("(pointer: fine)").matches,
  }))
);

/* partial fuse burn */
await page.evaluate(() => {
  const section = document.getElementById("services");
  const fuse = section.querySelector(".h-\\[3px\\]");
  const y = section.offsetTop + fuse.offsetTop - innerHeight * 0.8;
  window.scrollTo({ top: y, behavior: "instant" });
});
await page.waitForTimeout(900);
await page.screenshot({ path: shot("p1-fuse-partial") });

/* cards igniting — catch the sweep mid-flight */
await scrollToShowServices(page, 300);
await page.waitForTimeout(480);
await page.screenshot({ path: shot("p2-igniting") });
await page.waitForTimeout(2200);

/* hover: tilt + glare + ring + border */
const card = page.locator("#services article").first();
const box = await card.boundingBox();
await page.mouse.move(box.x + box.width * 0.25, box.y + box.height * 0.3, { steps: 8 });
await page.waitForTimeout(1000);
const hoverState = await page.evaluate(() => {
  const a = document.querySelectorAll("#services article")[0];
  const wrap = a.parentElement;
  const ring = a.querySelector(".ignite-ring");
  return {
    wrapIsTilt: wrap.className.includes("group/tilt"),
    tiltTransform: getComputedStyle(wrap).transform.slice(0, 40),
    ringOpacity: getComputedStyle(ring).opacity,
    ringAnim: getComputedStyle(ring).animationName,
    borderColor: getComputedStyle(a).borderColor,
    glareOpacity: getComputedStyle(wrap.lastElementChild).opacity,
  };
});
console.log("hover state:", hoverState);
await page.screenshot({ path: shot("p3-hover") });

/* overflow guard */
console.log(
  "overflow:",
  await page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth
  )
);

/* ── desktop, English ──────────────────────────────────────────────── */
await page.getByRole("button", { name: "التبديل إلى الإنجليزية" }).click();
await page.waitForLoadState("networkidle");
await page.waitForTimeout(600);
await scrollToShowServices(page, 300);
await page.waitForTimeout(2500);
const enHeading = await page.evaluate(
  () => document.querySelector("#services h2").textContent
);
console.log("en heading:", enHeading);
await page.screenshot({ path: shot("p4-english") });
await ctx.close();

/* ── mobile 390×844 (touch → no tilt branch) ───────────────────────── */
const mctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});
const mpage = await mctx.newPage();
await mpage.goto(URL, { waitUntil: "networkidle" });
await scrollToShowServices(mpage, 250);
await mpage.waitForTimeout(2500);
console.log(
  "mobile:",
  await mpage.evaluate(() => ({
    hover: matchMedia("(hover: hover)").matches,
    tiltWrappers: document.querySelectorAll("#services .group\\/tilt").length,
    noOverflow: document.documentElement.scrollWidth <= window.innerWidth,
  }))
);
await mpage.screenshot({ path: shot("p5-mobile") });
await mctx.close();

await browser.close();
console.log("DONE");
