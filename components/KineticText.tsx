"use client";

import { useEffect, useRef } from "react";

export type Segment = { text: string; accent?: boolean };

/**
 * Display type that rises character by character out of its own word box.
 *
 * The mask is the word, not the line, so the effect survives any wrap. Chars
 * are decorative duplicates — the readable string is exposed once to assistive
 * tech and the split is hidden from it.
 *
 * Waits on document.fonts.ready: a didone's widths change enormously between
 * the fallback serif and Bodoni, and animating before the swap makes the
 * letters visibly jump mid-flight.
 */
export default function KineticText({
  segments,
  className = "",
  delay = 0,
  trigger = "load",
  unit = "char",
}: {
  segments: Segment[];
  className?: string;
  delay?: number;
  /** "load" animates on mount; "scroll" waits until it enters the viewport */
  trigger?: "load" | "scroll";
  /** Long passages reveal by word — a per-character stagger over a full
   *  sentence runs for seconds and reads as a loading bar, not as craft. */
  unit?: "char" | "word";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const plain = segments.map((s) => s.text).join(" ");

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const chars = Array.from(root.querySelectorAll<HTMLElement>(".k-char"));
    if (!chars.length) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      chars.forEach((c) => (c.style.transform = "none"));
      root.classList.add("k-ready");
      return;
    }

    let killed = false;
    let cleanup = () => {};

    const run = async () => {
      const { gsap } = await import("gsap");
      if (killed) return;

      try {
        await document.fonts.ready;
      } catch {
        /* fonts API unavailable — animate anyway */
      }
      if (killed) return;

      root.classList.add("k-ready");

      /**
       * GSAP must own the transform before it animates it. The CSS start
       * state is `translateY(108%)`, which computes to a pixel matrix; a tween
       * to `yPercent: 0` zeroes the percentage while leaving those pixels in
       * place, and every character stays parked inside its mask. Setting it
       * here converts the start state into GSAP's own yPercent.
       */
      gsap.set(chars, {
        yPercent: 108,
        y: 0,
        rotateX: -55,
        transformOrigin: "50% 100%",
      });

      const play = () =>
        gsap.to(chars, {
          yPercent: 0,
          rotateX: 0,
          duration: unit === "word" ? 1 : 1.15,
          delay,
          ease: "expo.out",
          stagger: { each: unit === "word" ? 0.055 : 0.014, from: "start" },
        });

      if (trigger === "load") {
        play();
        return;
      }

      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              play();
              io.disconnect();
            }
          }
        },
        { threshold: 0.25 },
      );
      io.observe(root);
      cleanup = () => io.disconnect();
    };

    run();
    return () => {
      killed = true;
      cleanup();
    };
  }, [delay, trigger, unit]);

  let k = 0;

  return (
    <span className={className}>
      <span className="sr-only">{plain}</span>
      <span ref={ref} aria-hidden="true" className="k-root">
        {segments.map((seg, si) => (
          <span key={si} className={seg.accent ? "accent-italic" : undefined}>
            {seg.text.split(" ").map((word, wi) => (
              <span key={wi} className="k-word">
                {unit === "word" ? (
                  <span className="k-char">{word}</span>
                ) : (
                  Array.from(word).map((ch) => (
                    <span key={k++} className="k-char">
                      {ch}
                    </span>
                  ))
                )}
              </span>
            ))}
          </span>
        ))}
      </span>
    </span>
  );
}
