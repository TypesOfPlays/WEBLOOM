/* ============================================================================
 * WEBLOOM — every word on the site lives here.
 *
 * Anything marked `placeholder: true` or wrapped in <<< >>> is NOT real and is
 * waiting on you. Replace the value, flip the flag to false, and the badge and
 * the "to be confirmed" styling disappear on their own.
 *
 * Nothing in this file invents a client, a metric, a testimonial or a year of
 * experience. That is deliberate — you have to be able to defend every line of
 * this page in a sales call.
 * ========================================================================== */

export type Schematic = "commerce" | "dashboard" | "editorial" | "product";

export const site = {
  name: "WEBLOOM",
  /** TODO: your real name — shown in About and the footer. */
  owner: "<<<Your Name>>>",
  ownerPlaceholder: true,
  role: "Frontend Developer",
  url: "https://typesofplays.github.io/WEBLOOM",
  description:
    "WEBLOOM is the studio practice of a frontend developer building fast, considered interfaces for the web — React, Next.js and TypeScript.",
  /** TODO: the address you actually want strangers emailing. */
  email: "<<<you@example.com>>>",
  emailPlaceholder: true,
  /** TODO: e.g. "Mumbai, India" */
  location: "<<<Your City>>>",
  locationPlaceholder: true,
  /** TODO: e.g. "GMT+5:30" */
  timezone: "<<<GMT+0>>>",
  timezonePlaceholder: true,
  availability: {
    open: true,
    label: "Available for freelance",
    detail: "Taking new projects",
  },
};

export const socials: { label: string; href: string; placeholder?: boolean }[] =
  [
    { label: "GitHub", href: "https://github.com/TypesOfPlays" },
    { label: "LinkedIn", href: "<<<your linkedin url>>>", placeholder: true },
    { label: "X", href: "<<<your x url>>>", placeholder: true },
    { label: "Read.cv", href: "<<<your cv url>>>", placeholder: true },
  ];

export const hero = {
  /* Rendered as: Creative *frontend* developer — the italic word is amber. */
  lineOne: ["Creative"],
  accent: "frontend",
  lineTwo: ["developer"],
  lead:
    "I build the part of the product people actually touch — interfaces that load fast, read clearly and feel deliberate on every screen.",
  meta: [
    { k: "Status", v: "Available for work", live: true },
    { k: "Based in", v: site.location, placeholder: site.locationPlaceholder },
    { k: "Working", v: "Remote, worldwide" },
    { k: "Focus", v: "React · Next.js · TypeScript" },
  ],
};

export const about = {
  statement:
    "A site is the first thing a client experiences, and usually the only thing they judge you by. I build them like that matters.",
  body: [
    "WEBLOOM is a one-person frontend practice. I take a product from a rough idea, a Figma file or an existing broken site, and turn it into something that loads in under a second, works on a five-year-old phone, and reads clearly to a person who has never heard of your company.",
    "The work is mostly React, Next.js and TypeScript, with a lot of attention paid to the things people notice without being able to name — how type is set, how motion behaves, what happens on the slow connection, what happens when there is no data yet.",
  ],
  capabilities: [
    {
      title: "Interface engineering",
      detail:
        "Production React and Next.js. Component systems that survive contact with a second developer.",
    },
    {
      title: "Motion & interaction",
      detail:
        "Motion that explains state changes rather than decorating them. Reduced-motion honoured everywhere.",
    },
    {
      title: "Performance",
      detail:
        "Core Web Vitals treated as a design constraint. Images, fonts and JavaScript kept on a budget.",
    },
    {
      title: "Responsive & accessible",
      detail:
        "One layout that holds from 320px to ultrawide, keyboard-operable, WCAG AA contrast.",
    },
  ],
};

export type Project = {
  title: string;
  kind: string;
  blurb: string;
  stack: string[];
  year: string;
  href?: string;
  repo?: string;
  schematic: Schematic;
  /** true = example entry, shows a PLACEHOLDER badge. Flip to false when real. */
  placeholder: boolean;
};

/* ---------------------------------------------------------------------------
 * These four are EXAMPLE ENTRIES, drawn as schematics rather than fake
 * screenshots so nothing here can be mistaken for a real shipped product.
 * Send me your real projects and these get replaced wholesale.
 * ------------------------------------------------------------------------- */
export const projects: Project[] = [
  {
    title: "Storefront",
    kind: "E-commerce",
    blurb:
      "A headless shop front — product grid, variant picker, cart drawer and a checkout that never drops the user back to the top of the page.",
    stack: ["Next.js", "TypeScript", "Stripe", "Tailwind"],
    year: "2025",
    schematic: "commerce",
    placeholder: true,
  },
  {
    title: "Console",
    kind: "Dashboard",
    blurb:
      "A data console built around a dense table nobody has to fight: virtualised rows, sticky filters, and charts that stay readable at a glance.",
    stack: ["React", "TypeScript", "D3", "TanStack"],
    year: "2025",
    schematic: "dashboard",
    placeholder: true,
  },
  {
    title: "Studio Site",
    kind: "Marketing",
    blurb:
      "A single-page site for a small studio. Scroll-driven reveals, real typography, and a Lighthouse score that survived the animation budget.",
    stack: ["Next.js", "GSAP", "Sanity"],
    year: "2024",
    schematic: "editorial",
    placeholder: true,
  },
  {
    title: "Product App",
    kind: "Web app",
    blurb:
      "Auth, onboarding, empty states and the unglamorous screens most portfolios skip — the ones that decide whether a product feels finished.",
    stack: ["Next.js", "Supabase", "Tailwind"],
    year: "2024",
    schematic: "product",
    placeholder: true,
  },
];

export const contact = {
  headline: ["Have something", "worth building?"],
  body:
    "Tell me what you are making, roughly when you need it, and what success looks like. I answer every genuine enquiry, usually within a day.",
  cta: "Start a project",
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
