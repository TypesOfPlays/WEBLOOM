"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/content";
import Schematic from "./Schematic";
import Reveal from "./Reveal";

/**
 * The work list refuses the grid of identical cards. Projects are large
 * typographic rows on hairlines; on a fine pointer the hovered row summons its
 * schematic, which trails the cursor. On touch the schematic is simply there.
 */
export default function Work() {
  const [active, setActive] = useState<number | null>(null);
  const [fine, setFine] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const set = () => setFine(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    if (!fine) return;
    const p = pos.current;

    const tick = () => {
      p.x += (p.tx - p.x) * 0.14;
      p.y += (p.ty - p.y) * 0.14;
      if (previewRef.current) {
        previewRef.current.style.transform =
          "translate3d(" + p.x + "px," + p.y + "px,0)";
      }
      p.raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      p.tx = e.clientX + 28;
      p.ty = e.clientY - 110;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    p.raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(p.raf);
      p.raf = 0;
    };
  }, [fine]);

  const current = active === null ? null : projects[active];

  return (
    <section
      id="work"
      className="relative z-10 scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-b border-line pb-8">
            <h2 className="text-4xl font-semibold tracking-[-0.035em] text-chalk sm:text-6xl lg:text-7xl">
              Selected work
            </h2>
            <p className="max-w-[34ch] text-sm leading-relaxed text-mute">
              Four shapes of frontend problem I take on. Real case studies are
              being written up — these entries are marked accordingly.
            </p>
          </div>
        </Reveal>

        <ul
          className="mt-2"
          onMouseLeave={() => setActive(null)}
        >
          {projects.map((p, i) => {
            const interactive = Boolean(p.href);
            const Row = interactive ? "a" : "div";

            return (
              <Reveal as="li" key={p.title} delay={i * 70}>
                <Row
                  {...(interactive
                    ? {
                        href: p.href,
                        target: "_blank",
                        rel: "noreferrer noopener",
                      }
                    : {})}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={
                    "group relative grid grid-cols-[auto_1fr] items-baseline gap-x-4 gap-y-3 border-b border-line py-7 transition-colors duration-500 sm:gap-x-7 sm:py-9 lg:grid-cols-[3.5rem_minmax(0,1fr)_15rem_5rem_2rem] lg:items-center " +
                    (interactive ? "cursor-pointer " : "") +
                    (active !== null && active !== i
                      ? "opacity-45 "
                      : "opacity-100 ")
                  }
                >
                  <span className="label tnum pt-1 transition-colors duration-500 group-hover:text-mint lg:pt-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <h3 className="flex flex-wrap items-center gap-x-3 gap-y-2 text-2xl font-semibold tracking-[-0.03em] text-chalk transition-colors duration-500 group-hover:text-amber sm:text-4xl lg:text-[2.75rem]">
                      {p.title}
                      {p.placeholder && (
                        <span className="rounded-full border border-amber/45 px-2.5 py-1 text-[0.5625rem] font-semibold uppercase tracking-[0.18em] text-amber">
                          Placeholder
                        </span>
                      )}
                    </h3>
                    <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-mute lg:hidden">
                      {p.blurb}
                    </p>
                  </div>

                  {/* Touch + small screens get the schematic inline */}
                  <div className="col-span-2 mt-2 overflow-hidden rounded-lg border border-line lg:hidden">
                    <div className="aspect-[4/3] w-full">
                      <Schematic kind={p.schematic} />
                    </div>
                  </div>

                  <p className="col-span-2 hidden text-sm leading-relaxed text-mute lg:col-span-1 lg:block">
                    {p.kind}
                    <span className="mt-1.5 block text-faint">
                      {p.stack.join(" · ")}
                    </span>
                  </p>

                  <span className="label tnum hidden lg:block">{p.year}</span>

                  <span className="hidden justify-self-end text-mute transition-all duration-500 group-hover:translate-x-1 group-hover:text-amber lg:block">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 14L14 4M14 4H6.5M14 4v7.5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Row>
              </Reveal>
            );
          })}
        </ul>
      </div>

      {/* Cursor-trailing preview, desktop only */}
      {fine && (
        <div
          ref={previewRef}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
        >
          <div
            className={
              "w-[22rem] overflow-hidden rounded-xl border border-line bg-shelf/90 backdrop-blur-md transition-[opacity,transform] duration-500 ease-out " +
              (current
                ? "scale-100 opacity-100"
                : "pointer-events-none scale-95 opacity-0")
            }
            style={{
              boxShadow:
                "0 28px 60px -18px rgba(2,4,10,0.85), 0 2px 0 0 rgba(255,255,255,0.03) inset",
            }}
          >
            <div className="aspect-[4/3] w-full">
              {current && <Schematic kind={current.schematic} />}
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-line px-4 py-3">
              <span className="text-xs font-medium text-chalk">
                {current?.kind}
              </span>
              <span className="label tnum">{current?.year}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
