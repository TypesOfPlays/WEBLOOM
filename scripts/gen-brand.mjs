/**
 * Derive the site's brand assets from the supplied logo lockup.
 *
 *   node scripts/gen-brand.mjs
 *
 * The source is a flat PNG on an opaque navy card with a grid pattern behind
 * it. The site's ground is a different near-black, so the card has to go: the
 * mark is keyed out to transparency by how mint each pixel is, which also
 * drops the grid without touching the artwork.
 *
 * Produces:
 *   public/brand/webloom-mark.png   the W alone, transparent, for the nav
 *   app/icon.png                    the favicon, padded and centred
 *
 * Requires Python with Pillow.
 */
import { execFileSync } from "node:child_process";
import { writeFileSync, unlinkSync } from "node:fs";
import { resolve } from "node:path";

const PY = resolve(process.cwd(), "scripts/_brand.py");

writeFileSync(
  PY,
  `
from PIL import Image
import os

SRC = os.path.join("public", "brand", "webloom-logo.png")
img = Image.open(SRC).convert("RGBA")
w, h = img.size
px = img.load()

# The artwork is mint (high G and B, low R) on a dark navy card. Alpha is
# driven by how far each pixel leans mint, so the card and its grid fall away
# while the mark's own antialiasing is preserved rather than hard-clipped.
out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
op = out.load()
for y in range(h):
    for x in range(w):
        r, g, b, _ = px[x, y]
        mint = (g + b) / 2.0 - r          # positive where the artwork is
        a = max(0.0, min(1.0, (mint - 20) / 120.0))
        if a > 0:
            op[x, y] = (0, 255, 224, int(round(a * 255)))

# Trim to the artwork, then split the lockup: the mark sits well above the
# wordmark, so the widest empty row between them is the cut.
bbox = out.getbbox()
out = out.crop(bbox)
w, h = out.size
op = out.load()

rows = []
for y in range(h):
    n = 0
    for x in range(w):
        if op[x, y][3] > 8:
            n += 1
    rows.append(n)

# find the longest run of empty rows in the middle third
best, run, start = (0, 0, 0), 0, 0
for y in range(int(h * 0.25), int(h * 0.85)):
    if rows[y] == 0:
        if run == 0:
            start = y
        run += 1
        if run > best[0]:
            best = (run, start, y)
    else:
        run = 0

cut = (best[1] + best[2]) // 2 if best[0] else h
mark = out.crop((0, 0, w, cut))
mark = mark.crop(mark.getbbox())

os.makedirs(os.path.join("public", "brand"), exist_ok=True)
mark.save(os.path.join("public", "brand", "webloom-mark.png"))
print("mark", mark.size)

# A compact crop for small sizes. The antennae above the W and the drips below
# it roughly double the mark's bounding box while carrying almost no ink, so
# at nav or favicon scale the letter itself shrinks to nothing and the lockup
# reads as unbalanced. Keep only the rows and columns that actually carry the
# letterform.
mp = mark.load()
mw, mh = mark.size
rowcov = [sum(1 for x in range(mw) if mp[x, y][3] > 8) for y in range(mh)]
colcov = [sum(1 for y in range(mh) if mp[x, y][3] > 8) for x in range(mw)]
rt = max(rowcov) * 0.16
ct = max(colcov) * 0.16
ys = [y for y, v in enumerate(rowcov) if v >= rt]
xs = [x for x, v in enumerate(colcov) if v >= ct]
core = mark.crop((xs[0], ys[0], xs[-1] + 1, ys[-1] + 1))
core.save(os.path.join("public", "brand", "webloom-mark-compact.png"))
print("compact", core.size)

# Favicon: square, padded, centred. At tab size the mark needs room or it
# reads as a smear against the browser chrome.
S = 512
pad = int(S * 0.14)
box = S - pad * 2
mw, mh = core.size
scale = min(box / mw, box / mh)
resized = core.resize((max(1, int(mw * scale)), max(1, int(mh * scale))), Image.LANCZOS)

icon = Image.new("RGBA", (S, S), (5, 7, 14, 255))
icon.paste(
    resized,
    ((S - resized.size[0]) // 2, (S - resized.size[1]) // 2),
    resized,
)
icon.save(os.path.join("app", "icon.png"))
print("icon", icon.size)
`,
  "utf-8",
);

try {
  const out = execFileSync("python", [PY], { encoding: "utf-8" });
  process.stdout.write(out);
} finally {
  unlinkSync(PY);
}
