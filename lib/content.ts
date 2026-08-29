/* ============================================================================
 * WEBLOOM — every word on the site lives here.
 *
 * Nothing in this file invents a client, a metric, a testimonial or a year of
 * experience. Project descriptions were written from the live sites
 * themselves. Next.js and React are verifiable from each shipped bundle;
 * TypeScript is there because Ankit confirmed it for all three. Add anything
 * else you really used — and nothing you did not.
 *
 * There are no placeholders left. If you add a fact you have not verified,
 * mark it `placeholder: true` or wrap it in <<< >>> so it renders as visibly
 * provisional rather than as a claim.
 * ========================================================================== */

export type Schematic = "commerce" | "dashboard" | "editorial" | "product";

export const site = {
  name: "WEBLOOM",
  owner: "Ankit Mohapatra",
  ownerPlaceholder: false,
  role: "Frontend Developer",
  url: "https://typesofplays.github.io/WEBLOOM",
  description:
    "WEBLOOM is the practice of Ankit Mohapatra, a frontend developer in Kendrapara building fast, considered websites for real businesses — React, Next.js and static-first delivery.",
  email: "moankit517@gmail.com",
  emailPlaceholder: false,
  location: "Kendrapara, India",
  locationPlaceholder: false,
  timezone: "GMT+5:30",
  timezonePlaceholder: false,
  availability: {
    open: true,
    label: "Available for freelance",
    detail: "Taking new projects",
  },
};

export const socials: { label: string; href: string; placeholder?: boolean }[] =
  [
    { label: "GitHub", href: "https://github.com/TypesOfPlays" },
    { label: "Email", href: "mailto:moankit517@gmail.com" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ankit-mohapatra-8518683a6",
    },
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
    { k: "Based in", v: site.location },
    { k: "Working", v: "Remote, worldwide" },
    { k: "Focus", v: "React · Next.js · TypeScript" },
  ] as { k: string; v: string; live?: boolean; placeholder?: boolean }[],
};

export const about = {
  statement:
    "A site is the first thing a client experiences, and usually the only thing they judge you by. I build them like that matters.",
  body: [
    "WEBLOOM is a one-person frontend practice run from Kendrapara. I take a business from a rough idea, a Figma file or an existing broken site, and turn it into something that works on a five-year-old phone and reads clearly to a person who has never heard of your company.",
    "The work so far has been for real local businesses — a pathology lab, a collection centre, a financial advisory firm — where the visitor is usually anxious, in a hurry, or both. That shapes how I build: plain language first, bilingual where the audience needs it, and no interface flourish that gets in the way of a phone number.",
  ],
  /* Each of these restates something the body copy above already establishes.
     Nothing here is a new claim. */
  practice: [
    {
      k: "Direct",
      v: "You talk to the person writing the code. No account layer.",
    },
    {
      k: "Plain language",
      v: "Copy a customer can act on, not vocabulary that impresses me.",
    },
    {
      k: "Bilingual",
      v: "English and Odia where the audience actually needs both.",
    },
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
  href?: string;
  /** basename in public/work/ — regenerate with: node scripts/gen-work-shots.mjs */
  image?: string;
  /** fallback cover when there is no screenshot yet */
  schematic: Schematic;
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    title: "Swayamsiddha Diagnostics",
    kind: "Pathology lab · Kendrapara",
    blurb:
      "A bilingual English–Odia site for a fully automated pathology lab with digital X-ray and ECG. The whole visit is written out step by step — what to bring, what it costs, when the report is ready — so nobody arrives uncertain.",
    stack: ["Next.js", "React", "TypeScript", "Bilingual UI"],
    href: "https://swayamsiddhadiagnostics.in/",
    image: "swayamsiddha-lab",
    schematic: "editorial",
  },
  {
    title: "Swayamsiddha Collection Centre",
    kind: "Test directory · Kendrapara",
    blurb:
      "The sibling site for the Old Hospital Road branch. All 73 tests are searchable by the shorthand a doctor actually writes — KFT, LFT, TSH — and the header counts down live to closing time.",
    stack: ["Next.js", "React", "TypeScript", "Client-side search"],
    href: "https://swayamsiddhadiagnostics.info/",
    image: "swayamsiddha-collection",
    schematic: "product",
  },
  {
    title: "A to Z Financial Solution Hub",
    kind: "Financial advisory · Bhubaneswar",
    blurb:
      "Investments, insurance and tax laid out as numbered chapters, with animated counters and an enquiry form that composes the visitor's WhatsApp message for them before they send it.",
    stack: ["Next.js", "React", "TypeScript", "GitHub Pages"],
    href: "https://typesofplays.github.io/atozfinancialsolutionhub/",
    image: "atoz-financial",
    schematic: "dashboard",
  },
];

export const contact = {
  headline: ["Have something", "worth building?"],
  body:
    "Tell me what you are making, roughly when you need it, and what success looks like. A short message with the real constraints is worth more than a long brief.",
  cta: "Start a project",
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
