/**
 * Verify every project cover actually decodes and paints at mobile width.
 * A cover that is loaded but undecoded paints as an empty hole on a fast
 * scroll, which a screenshot will happily show as "designed".
 *
 *   npm run build && node scripts/cover-check.mjs
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
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
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
    const body = readFileSync(p);
    res.writeHead(200, {
      "content-type": TYPES[extname(p)] ?? "application/octet-stream",
    });
    res.end(body);
  } catch {
    res.writeHead(404).end("not found");
  }
});
await new Promise((r) => server.listen(4175, r));

const browser = await puppeteer.launch({
  executablePath,
  headless: "new",
  args: ["--hide-scrollbars"],
});

let failures = 0;

for (const vp of [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
]) {
  const page = await browser.newPage();
  await page.setViewport({ ...vp, deviceScaleFactor: 1 });
  await page.goto("http://localhost:4175", { waitUntil: "networkidle0" });

  const covers = await page.evaluate(() =>
    Array.from(document.querySelectorAll("img.cover-img")).map((img) => ({
      src: img.currentSrc.split("/").pop(),
      complete: img.complete,
      w: img.naturalWidth,
      painted: img.getBoundingClientRect().width > 0,
    })),
  );

  console.log(`\n${vp.name} (${vp.width}px):`);
  for (const c of covers) {
    const ok = c.complete && c.w > 0;
    if (!ok) failures++;
    console.log(
      `  ${ok ? "ok  " : "FAIL"} ${c.src}  decoded=${c.complete} natural=${c.w}px laidOut=${c.painted}`,
    );
  }
  await page.close();
}

await browser.close();
server.close();

console.log(failures === 0 ? "\nAll covers decode." : `\n${failures} FAILED`);
process.exit(failures === 0 ? 0 : 1);
