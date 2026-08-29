import type { Metadata } from "next";
import { Manrope, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic"],
  variable: "--font-bodoni",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "frontend developer",
    "web developer",
    "React developer",
    "Next.js",
    "freelance web developer",
    site.name,
  ],
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
};

const DIRECTION_CONTRACT = `<!--
impeccable:direction WEBLOOM / seed: pinned-reference-19871911

THESIS: A frontend developer is judged by the frontend you are standing in.
The page is the proof, so it refuses the resume-grid portfolio of equal cards.

OWN-WORLD: Deep navy-black ground, one drifting amber+mint aurora behind
everything, film grain over all of it. Manrope at poster scale with a single
Bodoni italic word in amber. Hairline rules, tiny wide-tracked labels, no cards.

STORY: A client sees taste in the first second, scans real work as large
typographic rows, learns who is behind it, and sends one email.

FIRST VIEWPORT: Full-bleed aurora; wordmark and three nav links on a hairline;
"Creative frontend developer" set huge with "frontend" in amber italic, left-aligned
across the fold; four meta labels on the baseline rule; availability pill top-right.

FORM: Pinned reference composition, not a generated concept. Ranked 1 of 1 —
the brief pins both world and structure.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${bodoni.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className="grain antialiased">
        <div
          aria-hidden="true"
          style={{ display: "none" }}
          dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }}
        />
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:rounded-full focus:bg-mint focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-void"
        >
          Skip to work
        </a>
        {children}
      </body>
    </html>
  );
}
