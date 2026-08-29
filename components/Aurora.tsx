"use client";

import { useEffect, useRef } from "react";

/**
 * The one authored atmosphere of the page: a slow-drifting field of light
 * behind everything, which leans very slightly toward the pointer.
 *
 * The Gaussian is baked into transparent PNGs by scripts/gen-aurora.mjs rather
 * than applied live. A `filter: blur()` on a layer this size re-rasterises the
 * whole surface every animation frame; raw radial gradients avoid that but band
 * visibly on a dark ground. Pre-blurred rasters give the soft, volumetric field
 * the design wants and cost nothing per frame — the layers only ever transform.
 */

const bp = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function Blob({
  name,
  className,
  style,
  opacity,
}: {
  name: "blue" | "mint" | "amber";
  className?: string;
  style?: React.CSSProperties;
  opacity: number;
}) {
  return (
    <img
      src={`${bp}/aurora/${name}-1400.png`}
      srcSet={`${bp}/aurora/${name}-700.png 700w, ${bp}/aurora/${name}-1400.png 1400w`}
      sizes="(max-width: 768px) 130vw, 90vw"
      alt=""
      aria-hidden="true"
      decoding="async"
      fetchPriority={name === "blue" ? "high" : "low"}
      className={`absolute max-w-none select-none ${className ?? ""}`}
      style={{ opacity, willChange: "transform", ...style }}
    />
  );
}

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
      <Blob name="blue" className="aurora-blue drift-a" opacity={0.95} />
      <Blob name="mint" className="aurora-mint drift-b" opacity={0.8} />
      <Blob name="amber" className="aurora-amber drift-c" opacity={0.75} />

      {/* Pointer-led highlight — the field notices you */}
      <div
        className="absolute inset-0"
        style={{
          transform:
            "translate3d(calc(var(--px) * 46px), calc(var(--py) * 32px), 0)",
          willChange: "transform",
        }}
      >
        <Blob name="blue" className="aurora-cursor" opacity={0.32} />
      </div>

    </div>
  );
}
