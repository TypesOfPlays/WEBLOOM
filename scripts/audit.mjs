/**
 * Whole-site debug sweep against the production export.
 *
 *   npm run build && node scripts/audit.mjs
 *
 * Checks the things that break quietly: console errors, failed requests,
 * horizontal overflow, the no-JS and reduced-motion paths, keyboard focus,
 * heading order, image alt text, touch target sizes, and link integrity.
 */
import puppeteer from "puppeteer-core";
import { createServer } from "node:http";
import { readFileSync, statSync, existsSync } from "node:fs";
import { join, extname, resolve } from "node:path";

const DIST = resolve(process.cwd(), "out");
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
};
const CANDIDATES = [
  "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
];
const executablePath = CANDIDATES.find((p) => existsSync(p));

const server = createServer((req, res) => {
  let p = join(DIST, decodeURIComponent(req.url.split("?")[0]));
  try {
    if (statSync(p).isDirectory()) p = join(p, "index.html");
  } catch {
    p = join(DIST, "404.html");
  }
  try {
    res.writeHead(200, {
      "content-type": TYPES[extname(p)] ?? "application/octet-stream",
    });
    res.end(readFileSync(p));
  } catch {
    res.writeHead(404).end("not found");
  }
});
await new Promise((r) => server.listen(4182, r));
const BASE = "http://localhost:4182";

const problems = [];
const notes = [];
const fail = (area, msg) => problems.push(`${area}: ${msg}`);
const note = (area, msg) => notes.push(`${area}: ${msg}`);

const browser = await puppeteer.launch({
  executablePath,
  headless: "new",
  args: ["--hide-scrollbars"],
});

/* ---------------------------------------------------------------- console */
for (const vp of [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844, isMobile: true },
  { name: "narrow", width: 320, height: 720, isMobile: true },
]) {
  const page = await browser.newPage();
  const errors = [];
  const failed = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text().slice(0, 160));
  });
  page.on("pageerror", (e) => errors.push("UNCAUGHT " + String(e).slice(0, 160)));
  page.on("requestfailed", (r) =>
    failed.push(`${r.url().split("/").pop()} ${r.failure()?.errorText}`),
  );
  page.on("response", (r) => {
    if (r.status() >= 400) failed.push(`${r.url().split("/").pop()} -> ${r.status()}`);
  });

  await page.setViewport({ ...vp, deviceScaleFactor: 1 });
  await page.goto(BASE, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 5200));

  for (const e of errors) fail(`console/${vp.name}`, e);
  for (const f of failed) fail(`network/${vp.name}`, f);

  /* ------------------------------------------------------------- overflow */
  const overflow = await page.evaluate(() => {
    const de = document.documentElement;
    const wide = [];
    if (de.scrollWidth > de.clientWidth + 1) {
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.right > de.clientWidth + 2 || r.left < -2) {
          const cs = getComputedStyle(el);
          if (cs.position === "fixed" || cs.visibility === "hidden") continue;
          wide.push(
            `${el.tagName.toLowerCase()}.${String(el.className).split(" ")[0]} right=${Math.round(r.right)}`,
          );
        }
      }
    }
    return { scrollWidth: de.scrollWidth, clientWidth: de.clientWidth, wide: wide.slice(0, 5) };
  });
  if (overflow.scrollWidth > overflow.clientWidth + 1) {
    fail(
      `overflow/${vp.name}`,
      `page scrolls horizontally (${overflow.scrollWidth} > ${overflow.clientWidth}) ${overflow.wide.join("; ")}`,
    );
  }

  /* --------------------------------------------------------- a11y basics */
  const a11y = await page.evaluate(() => {
    const out = { imgsNoAlt: [], headings: [], smallTargets: [], emptyLinks: [] };
    for (const img of document.images) {
      if (!img.hasAttribute("alt")) out.imgsNoAlt.push(img.currentSrc.split("/").pop());
    }
    for (const h of document.querySelectorAll("h1,h2,h3,h4,h5,h6")) {
      out.headings.push(h.tagName + ":" + (h.textContent || "").trim().slice(0, 34));
    }
    for (const a of document.querySelectorAll("a,button")) {
      const r = a.getBoundingClientRect();
      const label = (a.textContent || "").trim() || a.getAttribute("aria-label") || "";
      if (r.width > 0 && r.height > 0 && (r.width < 24 || r.height < 24)) {
        out.smallTargets.push(`${label.slice(0, 24) || a.tagName} ${Math.round(r.width)}x${Math.round(r.height)}`);
      }
      if (!label && r.width > 0) out.emptyLinks.push(a.getAttribute("href") || a.tagName);
    }
    return out;
  });
  for (const i of a11y.imgsNoAlt) fail(`a11y/${vp.name}`, `image without alt: ${i}`);
  for (const l of a11y.emptyLinks) fail(`a11y/${vp.name}`, `control with no accessible name: ${l}`);
  for (const t of a11y.smallTargets) note(`touch/${vp.name}`, `target under 24px: ${t}`);
  if (vp.name === "desktop") {
    const levels = a11y.headings.map((h) => Number(h[1]));
    let prev = 0;
    for (let i = 0; i < levels.length; i++) {
      if (prev && levels[i] > prev + 1) {
        fail("a11y", `heading level jumps h${prev} -> h${levels[i]} (${a11y.headings[i]})`);
      }
      prev = levels[i];
    }
    note("a11y", `${a11y.headings.length} headings, h1 count = ${levels.filter((l) => l === 1).length}`);
  }

  /* :focus-visible cannot be read through getComputedStyle, and a scripted
     .focus() does not reliably match it either. The honest check presses Tab
     like a keyboard user — see scripts/focus-check.mjs. */
  if (vp.name === "desktop") {
    note("focus", "run scripts/focus-check.mjs for the keyboard focus ring check");
    await page.close();
    continue;
  }
  await page.close();
}

/* ------------------------------------------------------ reduced motion */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.goto(BASE, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1800));
  const state = await page.evaluate(() => {
    const hidden = Array.from(document.querySelectorAll(".k-char")).filter((c) => {
      const cr = c.getBoundingClientRect();
      const wr = c.parentElement.getBoundingClientRect();
      return Math.min(cr.bottom, wr.bottom) - Math.max(cr.top, wr.top) < cr.height * 0.6;
    }).length;
    const rev = Array.from(document.querySelectorAll(".reveal")).filter(
      (r) => getComputedStyle(r).opacity !== "1",
    ).length;
    return {
      hidden,
      unrevealed: rev,
      intro: Boolean(document.querySelector("svg.fixed.z-\\[100\\]")),
      underline: getComputedStyle(document.querySelector(".k-underline path")).strokeDashoffset,
    };
  });
  if (state.hidden) fail("reduced-motion", `${state.hidden} display characters invisible`);
  if (state.unrevealed) fail("reduced-motion", `${state.unrevealed} sections still hidden`);
  if (state.intro) fail("reduced-motion", "boot curtain rendered despite reduce");
  if (state.underline !== "0px")
    fail("reduced-motion", `underline not drawn (dashoffset ${state.underline})`);
  await page.close();
}

/* ------------------------------------------------------------ no script */
{
  const page = await browser.newPage();
  await page.setJavaScriptEnabled(false);
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  const state = await page.evaluate(() => ({
    text: document.body.innerText.replace(/\s+/g, " ").trim().length,
    h1: document.querySelector("h1")?.innerText?.trim().slice(0, 40),
    links: document.querySelectorAll("a[href]").length,
  }));
  if (state.text < 800) fail("no-js", `only ${state.text} chars of text render`);
  if (!state.h1) fail("no-js", "no h1 text without JavaScript");
  note("no-js", `${state.text} chars, ${state.links} links, h1 "${state.h1}"`);
  await page.close();
}

/* ------------------------------------------------------------ link check */
{
  const page = await browser.newPage();
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a[href]"))
      .map((a) => a.getAttribute("href"))
      .filter((h) => h && !h.startsWith("#")),
  );
  await page.close();
  const unique = [...new Set(links)];
  for (const href of unique) {
    if (href.startsWith("mailto:")) {
      if (!/^mailto:[^@\s]+@[^@\s]+\.[a-z]{2,}/i.test(href))
        fail("links", `malformed mailto: ${href}`);
      continue;
    }
    try {
      const res = await fetch(href, { method: "GET", redirect: "follow" });
      // 999 is LinkedIn's anti-scraping response and 403/429 are usually bot
      // protection; they say nothing about whether the link is correct, so
      // they are reported rather than failed.
      if ([999, 403, 429].includes(res.status)) {
        note("links", `${href} -> ${res.status} (bot protection; verify by hand)`);
      } else if (!res.ok) {
        fail("links", `${href} -> ${res.status}`);
      } else {
        note("links", `${href} -> ${res.status}`);
      }
    } catch (e) {
      fail("links", `${href} unreachable (${String(e).slice(0, 60)})`);
    }
  }
}

await browser.close();
server.close();

console.log("\n=== PROBLEMS ===");
console.log(problems.length ? problems.map((p) => " ✗ " + p).join("\n") : " none");
console.log("\n=== NOTES ===");
console.log(notes.map((n) => " · " + n).join("\n"));
process.exit(problems.length ? 1 : 0);
