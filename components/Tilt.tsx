"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Real 3D: the element rotates on X and Y toward the pointer and lifts on Z.
 *
 * Rotation is driven from the pointer's position across the viewport rather
 * than only when hovering the element itself, so the cover keeps responding
 * while the visitor is reading the rows beside it.
 */
export default function Tilt({
  children,
  max = 7,
  lift = 26,
  className = "",
}: {
  children: ReactNode;
  /** peak rotation in degrees */
  max?: number;
  /** peak translateZ in px */
  lift?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches)
      return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const tick = () => {
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      const depth = (Math.abs(cx) + Math.abs(cy)) / 2;
      el.style.transform =
        `rotateX(${(-cy * max).toFixed(3)}deg) ` +
        `rotateY(${(cx * max).toFixed(3)}deg) ` +
        `translateZ(${(depth * lift).toFixed(2)}px)`;
      raf =
        Math.abs(tx - cx) > 0.0015 || Math.abs(ty - cy) > 0.0015
          ? requestAnimationFrame(tick)
          : 0;
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
      const py = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2);
      tx = Math.max(-1, Math.min(1, px));
      ty = Math.max(-1, Math.min(1, py));
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [max, lift]);

  return (
    <div
      className={className}
      style={{ perspective: "1200px", perspectiveOrigin: "50% 50%" }}
    >
      <div
        ref={ref}
        className="will-change-transform"
        style={{ transformStyle: "preserve-3d", transition: "none" }}
      >
        {children}
      </div>
    </div>
  );
}
