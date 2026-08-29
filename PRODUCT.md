# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4. Chosen by the user when offered the alternatives of a single static HTML file, Vite + React, and Astro. No deploy target confirmed yet; Vercel is the assumed default but is UNDECIDED.

## Users

Primary and only confirmed audience: **freelance clients** — business owners, founders, and agency leads evaluating whether to hire the site's owner to build a website or web interface for them.

Their situation: they are comparing a small number of developers, usually quickly, often on a phone, before writing a first email. They are not engineers. They are trying to answer three things — is this person good, have they done work like mine, and can I reach them. Success for this site is the visitor sending an email about a project.

Recruiters and hiring managers were explicitly NOT chosen as an audience. Do not restructure the site around resume-screening.

## Product Purpose

WEBLOOM is the personal portfolio site of a frontend web developer. It exists to convert a stranger's attention into a project inquiry. Success is measured in qualified inbound email, not in traffic or time on page.

## Positioning

**Frontend developer.** The work shown is the part of a product people see and interact with: interfaces, responsive layouts, animation, and performance. The pitch is craft in the visible layer.

The site is itself the primary proof — a visitor judges a frontend developer by the frontend they are standing in. This is a durable product constraint, not a stylistic one: any regression in the site's own polish, responsiveness, or performance directly contradicts the claim being made.

## Operating Context

Visitors arrive from a link the owner sends directly, from a social profile bio, or from a search for a local developer. First contact is frequently mobile. The visit is short and comparative. The exit action is email.

## Capabilities and Constraints

- Single-page marketing site. Confirmed sections: hero, about, work, contact.
- Motion brief: scroll reveals, animated gradient field, hover states on links and project cards, smooth anchor scrolling — all gated behind `prefers-reduced-motion`.
- All page copy and project data must live in one editable content module so the owner can fill placeholders without touching components.
- Contact mechanism: UNDECIDED between a big mailto link and a hosted form. Defaulting to mailto until the owner chooses; no form service has been signed up for.

### Undecided — must not be invented

The following are genuinely unknown and are to be shipped as clearly-marked placeholders, never as fabricated fact:

- The owner's real name, city, country, and timezone
- Availability status and rates
- Contact email address
- Social profile URLs (GitHub, LinkedIn, X, Instagram, Dribbble)
- Years of experience and any count of projects or clients
- Whether a resume/CV PDF exists

## Brand Commitments

- **Name: WEBLOOM.** Confirmed by the owner. This is the site's wordmark.
- **Binding visual reference:** the Dribbble shot "Landing | Designer portfolio" by Purrweb Web Design for Purrweb Graphics agency (shot 19871911). The owner asked for this look and, when offered alternatives, chose "copy it closely."
  - Near-black navy canvas with a soft blurred blue gradient field behind the hero
  - Very large sans headline with one word set in italic serif, in amber
  - Amber `#FFAB00` and mint `#00FFE0` as the only accent colors
  - Manrope as the primary typeface
  - Tiny uppercase wide-tracked meta labels
- The reference is a *designer's* portfolio; WEBLOOM belongs to a *developer*. The visual world is inherited; the content, proof, and vocabulary must be a developer's, not a designer's.

## Evidence on Hand

**None yet in the repository.** The owner confirmed real shipped projects exist and that names, links, and stack details are coming, but has provided none so far. There are no screenshots, no client names, no metrics, no testimonials, and no case studies on hand.

Hard rule for all future work: do not invent project names, client logos, testimonials, star ratings, headcounts, revenue figures, "trusted by" strips, or years-of-experience numbers. Placeholder content must be visibly placeholder.

## Product Principles

1. **The site is the portfolio.** Its own execution is the strongest evidence a frontend developer can offer; treat every craft regression as a broken product claim.
2. **Aim the page at a non-engineer buyer.** Lead with what the work does for them; keep framework vocabulary present but subordinate.
3. **Never fabricate proof.** An empty, honest slot outranks a convincing invention — the owner has to stand behind every word on this page in a sales conversation.
4. **One email is the goal.** Every section either builds confidence toward the contact action or is cut.
5. **Content is data, not markup.** The owner must be able to fill in real projects by editing one file.

## Accessibility & Inclusion

No client-specific standard was established. Baseline obligations apply and are non-negotiable given the positioning: WCAG AA contrast on the dark canvas, full keyboard operability with visible focus, honored `prefers-reduced-motion`, and no meaning carried by color alone.
