/**
 * One-off check: does the sticky work cover park against an empty rail at the
 * end of the section? Captures the section's final viewport at 1440x900.
 *
 *   npm run build && node scripts/sticky-check.mjs
 */
import puppeteer from "puppeteer-core";
import { createServer } from "node:http";
import { readFileSync, statSync, existsSync, mkdirSync } from "node:fs";
import { join, extname, resolve } from "node:path";

const DIST = resolve(process.cwd(), "out");
const OUT = resolve(process.cwd(), ".impeccable/review");
mkdirSync(OUT, { recursive: true });

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
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
];
const executablePath = CANDIDATES.find((p) => existsSync(p));
if (!executablePath) {
  console.error("No Chromium-based browser found.");
  process.exit(1);
}

const server = createServer((req, res) => {
  let p = join(DIST, decodeURIComponent(req.url.split("?")[0]));
  try {
    if (statSync(p).isDirectory()) p = join(p, "index.html");
  } catch {
    p = join(DIST, "404.html");
  }
  try {
    const body = readFileSync(p);
    res.writeHead(200, {
      "content-type": TYPES[extname(p)] ?? "application/octet-stream",
    });
    res.end(body);
  } catch {
    res.writeHead(404).end("not found");
  }
});
await new Promise((r) => server.listen(4174, r));

const browser = await puppeteer.launch({
  executablePath,
  headless: "new",
  args: ["--hide-scrollbars", "--force-color-profile=srgb"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
await page.goto("http://localhost:4174", { waitUntil: "networkidle0" });

await page.evaluate(() => {
  document
    .querySelectorAll(".reveal")
    .forEach((el) => el.classList.add("shown"));
  document.querySelectorAll(".drift-a, .drift-b, .drift-c").forEach((el) => {
    el.style.animationPlayState = "paused";
    el.style.animationDelay = "-13s";
  });
});

const info = await page.evaluate(() => {
  const section = document.getElementById("work");
  const rect = section.getBoundingClientRect();
  window.scrollTo(0, window.scrollY + rect.bottom - window.innerHeight + 40);
  const rows = section.querySelector("ul").getBoundingClientRect().height;
  return { sectionHeight: Math.round(rect.height), rowsHeight: Math.round(rows) };
});

await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: `${OUT}/sticky-end.png` });

console.log(
  `work section ${info.sectionHeight}px, rows column ${info.rowsHeight}px`,
);
console.log("→ .impeccable/review/sticky-end.png");

await browser.close();
server.close();
