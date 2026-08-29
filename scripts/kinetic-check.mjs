/**
 * Does the display type actually finish its reveal, and is every character
 * visible at rest? A stuck character inside a word mask is invisible, and a
 * screenshot alone cannot tell that apart from a mid-flight capture.
 *
 *   npm run build && node scripts/kinetic-check.mjs
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
    res.writeHead(404).end("nope");
  }
});
await new Promise((r) => server.listen(4176, r));

const browser = await puppeteer.launch({
  executablePath,
  headless: "new",
  args: ["--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto("http://localhost:4176", { waitUntil: "networkidle0" });

const sample = async (label) => {
  const data = await page.evaluate(() => {
    const chars = Array.from(document.querySelectorAll("h1 .k-char"));
    const words = Array.from(document.querySelectorAll("h1 .k-word"));
    // A character is "shown" when its box overlaps its word's mask box.
    let hidden = 0;
    for (const c of chars) {
      const cr = c.getBoundingClientRect();
      const wr = c.parentElement.getBoundingClientRect();
      const overlap =
        Math.min(cr.bottom, wr.bottom) - Math.max(cr.top, wr.top);
      if (overlap < cr.height * 0.6) hidden++;
    }
    const intro = document.querySelector(".fixed.z-\\[100\\]");
    return {
      chars: chars.length,
      words: words.length,
      hidden,
      introPresent: Boolean(intro),
      text: document.querySelector("h1 .sr-only")?.textContent,
    };
  });
  console.log(
    `${label.padEnd(10)} chars=${data.chars} words=${data.words} hiddenInMask=${data.hidden} intro=${data.introPresent}`,
  );
  return data;
};

for (const t of [600, 1400, 2400, 3600, 5000]) {
  await new Promise((r) => setTimeout(r, t === 600 ? 600 : 800));
  await sample(`${t}ms`);
}

const final = await sample("final");
console.log(`\nheadline text: "${final.text}"`);
console.log(
  final.hidden === 0
    ? "PASS — every character is visible at rest."
    : `FAIL — ${final.hidden} character(s) stuck inside their word mask.`,
);

await browser.close();
server.close();
process.exit(final.hidden === 0 ? 0 : 1);
