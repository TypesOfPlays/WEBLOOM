/**
 * Does keyboard focus actually show a ring?
 *
 *   npm run build && node scripts/focus-check.mjs
 *
 * `:focus-visible` styles cannot be read from getComputedStyle on a
 * pseudo-class, and calling el.focus() from script does not always match
 * :focus-visible anyway. The only honest test is to press Tab like a keyboard
 * user and read the resulting computed outline.
 */
import puppeteer from "puppeteer-core";
import { createServer } from "node:http";
import { readFileSync, statSync, existsSync } from "node:fs";
import { join, extname, resolve } from "node:path";

const DIST = resolve(process.cwd(), "out");
const OUT = resolve(process.cwd(), ".impeccable/review");
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
await new Promise((r) => server.listen(4183, r));

const browser = await puppeteer.launch({
  executablePath,
  headless: "new",
  args: ["--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto("http://localhost:4183", { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 5200));

const rows = [];
for (let i = 0; i < 8; i++) {
  await page.keyboard.press("Tab");
  await new Promise((r) => setTimeout(r, 140));
  const info = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      label: (el.textContent || "").trim().slice(0, 30) || el.tagName,
      outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`,
      offset: cs.outlineOffset,
      size: `${Math.round(r.width)}x${Math.round(r.height)}`,
    };
  });
  if (info) rows.push(info);
}

let bad = 0;
for (const r of rows) {
  const ok = !/^none/.test(r.outline) && !/ 0px /.test(r.outline);
  if (!ok) bad++;
  console.log(`${ok ? "ok  " : "FAIL"} ${r.label.padEnd(30)} ${r.outline}  offset ${r.offset}  ${r.size}`);
}

await page.screenshot({
  path: `${OUT}/focus-ring.png`,
  clip: { x: 0, y: 0, width: 1440, height: 200 },
});

console.log(
  bad === 0
    ? `\nPASS — all ${rows.length} tabbed controls show a focus ring.`
    : `\nFAIL — ${bad}/${rows.length} tabbed controls have no visible focus ring.`,
);

await browser.close();
server.close();
process.exit(bad === 0 ? 0 : 1);
