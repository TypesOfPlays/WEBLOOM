"use client";

import { useEffect, useRef } from "react";

/**
 * A trailing ring and an exact dot, in difference blend so they stay visible
 * over both the dark ground and the light covers.
 *
 * The native cursor is only hidden once this is actually running (the
 * `cursor-custom` class is added from here), so a failed script or a
 * reduced-motion visitor keeps a normal pointer.
 */
export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const root = document.documentElement;
    root.classList.add("cursor-custom");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    // Until the pointer actually moves we do not know where it is, and a ring
    // parked in the corner reads as a rendering bug. Reveal on first move.
    let revealed = false;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!revealed) {
        revealed = true;
        rx = x;
        ry = y;
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(1)`;
        ring.classList.add("is-live");
        dot.classList.add("is-live");
      }
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      scale += (targetScale - scale) * 0.16;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;

      const settled =
        Math.abs(x - rx) < 0.1 &&
        Math.abs(y - ry) < 0.1 &&
        Math.abs(targetScale - scale) < 0.001;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const INTERACTIVE = "a, button, [role='button'], input, textarea, select";

    const onOver = (e: PointerEvent) => {
      const hit = (e.target as Element | null)?.closest?.(INTERACTIVE);
      targetScale = hit ? 2.1 : 1;
      ring.dataset.on = hit ? "true" : "false";
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };
    const onEnter = () => {
      ring.style.opacity = "";
      dot.style.opacity = "";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      root.classList.remove("cursor-custom");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} aria-hidden="true" className="cursor-ring" />
      <div ref={dotRef} aria-hidden="true" className="cursor-dot" />
    </>
  );
}
