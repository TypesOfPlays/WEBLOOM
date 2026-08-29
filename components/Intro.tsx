"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/content";

/**
 * The boot sequence.
 *
 * A mint hairline draws across the dark, the wordmark resolves above it with
 * its tracking contracting from wide to set — the oldest luxury move in
 * lettering — and then the screen parts along that same line, top and bottom
 * withdrawing to reveal the page already in motion behind them.
 *
 * It renders only after mount, so the served HTML is the page itself. A
 * crawler, a reduced-motion visitor, or anyone arriving at a #hash never sees
 * it, and a failed script cannot leave a panel stuck over the content.
 */
export default function Intro() {
  const [armed, setArmed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

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
      const letters = q(".intro-letter");
      const mark = q(".intro-mark")[0];

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => {
          document.body.style.overflow = "";
          setArmed(false);
        },
      });

      tl.set(root, { autoAlpha: 1 })
        // the seam draws first, out from the centre
        .fromTo(
          q(".intro-seam"),
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9 },
        )
        // the wordmark resolves above it, tracking contracting as it lands
        .fromTo(
          letters,
          { yPercent: 130, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.028 },
          0.22,
        )
        .fromTo(
          mark,
          { letterSpacing: "0.95em", filter: "blur(7px)" },
          { letterSpacing: "0.42em", filter: "blur(0px)", duration: 1.05 },
          0.22,
        )
        // and withdraws
        .to(
          letters,
          {
            yPercent: -110,
            opacity: 0,
            duration: 0.5,
            ease: "power3.in",
            stagger: 0.014,
          },
          "+=0.28",
        )
        .to(q(".intro-seam"), { opacity: 0, duration: 0.45 }, "<0.12")
        // the screen parts along the seam
        .to(
          q(".intro-half-top"),
          { yPercent: -100, duration: 1.05, ease: "expo.inOut" },
          "<0.02",
        )
        .to(
          q(".intro-half-bottom"),
          { yPercent: 100, duration: 1.05, ease: "expo.inOut" },
          "<",
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
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{ visibility: "hidden" }}
    >
      <div className="intro-half-top absolute inset-x-0 top-0 h-[50.5%] bg-void" />
      <div className="intro-half-bottom absolute inset-x-0 bottom-0 h-[50.5%] bg-void" />

      <div
        className="intro-seam absolute inset-x-0 top-1/2 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--color-mint) 18%, var(--color-mint) 82%, transparent)",
          boxShadow: "0 0 24px 0 rgba(0,255,224,0.45)",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="intro-mark flex overflow-hidden pb-[0.6em] font-display text-[0.8rem] font-bold uppercase text-chalk sm:text-sm">
          {Array.from(site.name).map((ch, i) => (
            <span key={i} className="intro-letter inline-block">
              {ch}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
