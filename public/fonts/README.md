# Drop the Räder font files here

The site is already wired for Räder — it will switch over automatically as
soon as these files exist. Until then it falls back to Bodoni Moda, so the
build and the live site keep working with nothing missing.

## What to buy

**Räder**, by Valerio Monopoli — published by **Pangram Pangram**
https://pangrampangram.com/products/rader

Not Future Fonts. Commercial licences start around $40. The "free to try"
version is for evaluation: this site advertises freelance services, which is
commercial use, so it needs a paid licence.

Buy the **variable** family if it is offered — one file covers every weight
and the display sizes on this site use a light-to-regular range.

## Exact filenames expected

Download the **web** package (WOFF2) and rename to these, exactly:

    public/fonts/Rader-Variable.woff2          <- upright, variable
    public/fonts/Rader-Variable-Italic.woff2   <- italic, variable

If you bought static weights instead of variable, use these two instead and
tell me — the @font-face block in app/layout.tsx needs a one-line change:

    public/fonts/Rader-Regular.woff2
    public/fonts/Rader-Italic.woff2

## What happens then

1. `npm run build`
2. The page adds a `rader-live` class once the font actually loads, which
   applies Räder's own tracking instead of the didone's.
3. Headings, the WEBLOOM wordmark, and the amber accent word all switch.

Body copy, labels and UI stay on Manrope either way — that is deliberate.

## Both files or neither

Add the upright and the italic together. With only one present the headline
renders half Räder and half Bodoni, which looks like a bug rather than a
choice.
