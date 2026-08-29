"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/content";

/**
 * The boot sequence: the wordmark is the aperture.
 *
 * A void plate covers the page with WEBLOOM knocked out of it as an SVG mask,
 * so the aurora and the headline are visible *through* the letterforms from
 * the first frame. The word resolves — tracking contracting, a mint edge
 * drawing on — and then scales until its counters swallow the screen and the
 * plate is gone. The type is a window, never a graphic laid on top.
 *
 * It renders only after mount, so the served HTML is the page itself. A
 * crawler, a reduced-motion visitor, or anyone arriving at a #hash never sees
 * it. The plate is removed by the timeline's own onComplete, so even if masks
 * were unsupported the page would still be handed over.
 */
export default function Intro() {
  const [armed, setArmed] = useState(false);
  const rootRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.location.hash) return;
    if (window.scrollY > 0) return;
    setArmed(true);
  }, []);

  useEffect(() => {
    if (!armed) return;
    const root = rootRef.current;
    if (!root) return;

    document.body.style.overflow = "hidden";
    let killed = false;

    const run = async () => {
      const { gsap } = await import("gsap");
      if (killed) return;

      const q = gsap.utils.selector(root);
      // The knockout and the visible edge are separate elements in separate
      // trees, so every transform has to be applied to both together or the
      // outline drifts off the hole it belongs to.
      const words = q<SVGTextElement>(".intro-word");
      const edge = q(".intro-edge");
      const glow = q(".intro-glow");

      /**
       * Put the zoom origin on actual ink.
       *
       * The glyph fill is the window and everything else is plate, so the
       * origin has to sit on a stroke. The word's centre falls in a gap and
       * the O's counter is enclosed space — scaling from either expands the
       * plate over the screen and the reveal goes dead. getExtentOfChar gives
       * the real box of the "L", whose stem is solid from cap to baseline.
       */
      const setOrigin = () => {
        const ref = root.querySelector<SVGTextElement>(".intro-edge");
        if (!ref?.getExtentOfChar) return;
        try {
          const stem = ref.getExtentOfChar(site.name.indexOf("L"));
          gsap.set(words, {
            svgOrigin: `${stem.x + stem.width * 0.16} ${
              stem.y + stem.height * 0.5
            }`,
          });
        } catch {
          /* fall back to the element default */
        }
      };

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setArmed(false);
        },
      });

      tl.set(root, { autoAlpha: 1 })
        .fromTo(
          words,
          { attr: { "letter-spacing": "0.95em" }, scale: 0.94 },
          {
            attr: { "letter-spacing": "0.34em" },
            scale: 1,
            duration: 1.1,
            ease: "expo.out",
          },
        )
        .fromTo(
          edge,
          { opacity: 0, strokeDashoffset: 240 },
          { opacity: 1, strokeDashoffset: 0, duration: 1.05, ease: "expo.out" },
          0.1,
        )
        // hold, then the word opens and takes the plate with it
        // measured after the tracking has settled, never before
        .call(setOrigin)
        .to(edge, { opacity: 0, duration: 0.45, ease: "power2.in" }, "+=0.42")
        .to(words, { scale: 46, duration: 1.25, ease: "expo.inOut" }, "<-0.08")
        // The light holds all the way through the opening and the whole plate
        // dissolves at the end. Fading the glow while the window widened left
        // void over void — the plate and the page are the same near-black, so
        // the light is the only thing there is to reveal.
        .to(
          [root, glow],
          { opacity: 0, duration: 0.62, ease: "power2.out" },
          "-=0.42",
        );
    };

    run();

    return () => {
      killed = true;
      document.body.style.overflow = "";
    };
  }, [armed]);

  if (!armed) return null;

  return (
    <svg
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] h-full w-full"
      style={{ visibility: "hidden" }}
    >
      <defs>
        <radialGradient id="webloom-glow" cx="50%" cy="50%" r="62%">
          <stop offset="0%" stopColor="#9fe4ff" stopOpacity="0.95" />
          <stop offset="38%" stopColor="#2f6dff" stopOpacity="0.8" />
          <stop offset="72%" stopColor="#00ffe0" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#00ffe0" stopOpacity="0.06" />
        </radialGradient>

        <mask id="webloom-aperture">
          {/* white keeps the plate, black cuts the window */}
          <rect width="100%" height="100%" fill="#fff" />
          <text
            className="intro-word"
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#000"
          >
            {site.name}
          </text>
        </mask>
      </defs>

      {/* Light sits UNDER the plate, so it is only ever seen through the
          letterforms. Without it the plate and the page are the same
          near-black and the aperture reveals nothing at all. */}
      <rect
        className="intro-glow"
        width="100%"
        height="100%"
        fill="url(#webloom-glow)"
      />

      <rect
        width="100%"
        height="100%"
        fill="#05070e"
        mask="url(#webloom-aperture)"
      />

      {/* the mint edge, drawn on the same letterforms */}
      <text
        className="intro-word intro-edge"
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fill="none"
        stroke="#00ffe0"
        strokeWidth={1}
        strokeDasharray={240}
      >
        {site.name}
      </text>
    </svg>
  );
}
