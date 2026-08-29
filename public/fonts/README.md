# PP Räder — self-hosted display face

These are the WOFF2 files the site's headings, wordmark and amber accent word
render in. They are generated, not downloaded in this form — see below.

## Licence — read this

Source package: `PPRader-Free_for_personal_use_v1.0.zip`, whose own EULA is
`EULA-PangramPangram-FreeForPersonalUse-MAY2021`.

**That licence covers personal use only.** WEBLOOM advertises freelance
services, which is commercial use, so this site is currently outside the terms
it was given. A commercial licence from the foundry starts around $40:

    https://pangrampangram.com/products/rader

Buying it changes nothing in the code — same family name, same filenames. Only
the entitlement changes. Until then this is a known, deliberate exception, not
an oversight.

If you would rather not license it, delete this directory's `.woff2` files and
the site falls straight back to Bodoni Moda with no code change.

## What is here, and how it was made

The free package ships six static **OTF** files and no web formats, so each
was converted to WOFF2 and subsetted to Latin (the page has no other scripts;
the Odia on the Swayamsiddha sites belongs to those sites, not this one):

```bash
python -m fontTools.subset "PPRader-Thin.otf" \
  --output-file="Rader-Thin.woff2" --flavor=woff2 --layout-features='*' \
  --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"
```

That takes each face from ~245KB to ~70KB. Requires `fonttools` and `brotli`.

| File | Weight | Used by |
| --- | --- | --- |
| `Rader-Thin.woff2` | 100 | The hero headline above 1024px |
| `Rader-ThinItalic.woff2` | 100 italic | The amber accent word in that headline |
| `Rader-Regular.woff2` | 400 | Every other heading, and the hero below 1024px |
| `Rader-Italic.woff2` | 400 italic | The amber accent word at those sizes |
| `Rader-Bold.woff2` | 700 | The WEBLOOM wordmark |

`BoldItalic` and the unsubsetted originals are deliberately not shipped —
nothing on the page renders them.

Browsers fetch only the faces actually rendered, so a phone never downloads
the two hairline files.

## How the swap works

`app/layout.tsx` declares the `@font-face` blocks with the GitHub Pages base
path baked into `src`, because CSS `url()` cannot read a custom property. A
probe then calls `document.fonts.load('1em Rader')` and stamps `rader-live` on
`<html>` only on success — the `.rader-live` rules drop the optical-size axis
Räder does not have and open the tracking Bodoni needed closed. Didone spacing
on a road-sign sans reads as a mistake.
