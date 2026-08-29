"use client";

import { useEffect, useRef } from "react";

/**
 * The one authored atmosphere of the page: a slow-drifting field of light
 * behind everything, which leans very slightly toward the pointer. It is a
 * single orchestrated moment rather than scattered effects — every other
 * element on the page sits still and lets this breathe.
 *
 * Deliberately built from raw radial gradients with no `filter: blur()`.
 * A blurred layer this large forces a full-surface re-rasterise on every
 * animation frame; the gradients are already soft, and the grain overlay in
 * globals.css hides the banding a blur would otherwise have covered.
 */
export default function Aurora() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      cx += (tx - cx) * 0.045;
      cy += (ty - cy) * 0.045;
      el.style.setProperty("--px", cx.toFixed(4));
      el.style.setProperty("--py", cy.toFixed(4));
      raf =
        Math.abs(tx - cx) > 0.0015 || Math.abs(ty - cy) > 0.0015
          ? requestAnimationFrame(tick)
          : 0;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={
        {
          "--px": 0,
          "--py": 0,
          contain: "strict",
        } as React.CSSProperties
      }
    >
      {/* The deep blue body of the field */}
      <div
        className="drift-a absolute"
        style={{
          left: "-6%",
          top: "-34%",
          width: "86vw",
          height: "86vw",
          background:
            "radial-gradient(closest-side, rgba(41,104,255,0.46), rgba(28,64,180,0.24) 45%, rgba(18,38,110,0.09) 66%, transparent 80%)",
          willChange: "transform",
        }}
      />
      <div
        className="drift-b absolute"
        style={{
          right: "-16%",
          top: "-8%",
          width: "70vw",
          height: "70vw",
          background:
            "radial-gradient(closest-side, rgba(0,224,205,0.17), rgba(0,132,180,0.10) 48%, transparent 78%)",
          willChange: "transform",
        }}
      />
      <div
        className="drift-c absolute"
        style={{
          left: "26%",
          top: "18%",
          width: "62vw",
          height: "62vw",
          background:
            "radial-gradient(closest-side, rgba(255,171,0,0.17), rgba(255,110,0,0.08) 44%, transparent 76%)",
          willChange: "transform",
        }}
      />

      {/* Pointer-led highlight — the field notices you */}
      <div
        className="absolute inset-0"
        style={{
          transform:
            "translate3d(calc(var(--px) * 46px), calc(var(--py) * 32px), 0)",
          willChange: "transform",
        }}
      >
        <div
          className="absolute"
          style={{
            left: "50%",
            top: "8%",
            width: "56vw",
            height: "56vw",
            marginLeft: "-28vw",
            background:
              "radial-gradient(closest-side, rgba(140,180,255,0.15), transparent 72%)",
          }}
        />
      </div>

      {/* Vignette + floor: keeps text off the brightest part of the field */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 85% at 50% 2%, transparent 26%, rgba(5,7,14,0.5) 64%, rgba(5,7,14,0.9) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[45vh]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(5,7,14,0.86) 55%, #05070e)",
        }}
      />
    </div>
  );
}
