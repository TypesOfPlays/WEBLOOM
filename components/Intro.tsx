"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/content";

/**
 * The curtain. A void panel carrying the wordmark, which wipes up and off
 * while the hero's characters are already rising behind it.
 *
 * It renders only after mount, so the served HTML is the page itself — a
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

      const letters = root.querySelectorAll(".intro-letter");
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setArmed(false);
        },
      });

      tl.set(root, { autoAlpha: 1 })
        .from(letters, {
          yPercent: 120,
          duration: 0.75,
          ease: "expo.out",
          stagger: 0.035,
        })
        .to(
          letters,
          { yPercent: -120, duration: 0.6, ease: "expo.in", stagger: 0.02 },
          "+=0.12",
        )
        .to(
          root,
          { yPercent: -100, duration: 0.95, ease: "expo.inOut" },
          "-=0.32",
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
      style={{ visibility: "hidden" }}
    >
      <span className="flex overflow-hidden font-display text-[0.8rem] font-extrabold uppercase tracking-[0.42em] text-chalk sm:text-sm">
        {Array.from(site.name).map((ch, i) => (
          <span key={i} className="intro-letter inline-block">
            {ch}
          </span>
        ))}
      </span>
    </div>
  );
}
