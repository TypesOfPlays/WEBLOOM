"use client";

import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/lib/content";
import Schematic from "./Schematic";
import Reveal from "./Reveal";

const bp = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function Cover({ project, live }: { project: Project; live?: boolean }) {
  if (!project.image) {
    return <Schematic kind={project.schematic} />;
  }
  return (
    <img
      src={`${bp}/work/${project.image}-1600.jpg`}
      srcSet={`${bp}/work/${project.image}-800.jpg 800w, ${bp}/work/${project.image}-1600.jpg 1600w`}
      sizes="(max-width: 1023px) 92vw, 30rem"
      alt={`The ${project.title} site, as built`}
      /* Three small covers, all near the top of the page. Lazy-loading them
         means a fast scroll paints an undecoded cover as an empty hole. */
      loading="eager"
      decoding="sync"
      className={`cover-img h-full w-full object-cover ${live ? "is-live" : ""}`}
    />
  );
}

/**
 * The work list refuses the grid of identical cards: a sticky cover on the
 * left, large typographic rows on the right. Hover OR keyboard focus swaps the
 * cover, so the drawn work is reachable without a mouse — and on touch, where
 * there is no hover at all, each row simply carries its own cover.
 */
export default function Work() {
  const [active, setActive] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const engagedRef = useRef(false);

  const engage = (i: number) => {
    engagedRef.current = true;
    setEngaged(true);
    setActive(i);
  };

  /**
   * Follow the reading position. Without this the cover sits on project one
   * while a visitor scrolls past project three — most people scroll without
   * ever pointing at a row, and a picture of the wrong project is worse than
   * no picture. Hover and focus still override.
   */
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const wide = window.matchMedia("(min-width: 1024px)");
    let raf = 0;

    const nearest = () => {
      raf = 0;
      if (engagedRef.current || !wide.matches) return;
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      Array.from(list.children).forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(nearest);
    };

    nearest();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

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
              Sites built for real businesses, all of them live. Every one is
              linked — go and click around.
            </p>
          </div>
        </Reveal>

        <div
          className="mt-12 grid gap-x-16 lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] lg:items-start"
          onMouseLeave={() => {
            engagedRef.current = false;
            setEngaged(false);
          }}
        >
          {/* Sticky cover — desktop only; the rows carry their own on touch */}
          {/* Parked at viewport centre rather than under the nav: the rows
              column is shorter than the section, so a top-anchored panel
              strands a dead rail beneath itself at the section's end. */}
          <div className="hidden lg:sticky lg:top-[max(7rem,calc(50vh-13rem))] lg:block">
            <Reveal>
              <div
                className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-line bg-shelf"
                style={{
                  boxShadow: "0 30px 70px -28px rgba(2,4,10,0.9)",
                }}
              >
                {projects.map((p, i) => (
                  <div
                    key={p.title}
                    aria-hidden={i !== active}
                    className={
                      "absolute inset-0 transition-opacity duration-700 ease-out " +
                      (i === active ? "opacity-100" : "opacity-0")
                    }
                  >
                    <Cover project={p} live={engaged && i === active} />
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-col gap-2 border-t border-line pt-4">
                <span className="text-sm font-medium text-chalk">
                  {projects[active].kind}
                </span>
                <span className="label">
                  {projects[active].stack.join(" · ")}
                </span>
              </div>
            </Reveal>
          </div>

          <ul ref={listRef}>
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
                          onFocus: () => engage(i),
                          onBlur: () => {
                            engagedRef.current = false;
                            setEngaged(false);
                          },
                        }
                      : {})}
                    onMouseEnter={() => engage(i)}
                    className={
                      "group block border-b border-line py-8 transition-colors duration-500 sm:py-10 lg:py-14 " +
                      (interactive ? "cursor-pointer" : "")
                    }
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
                      <h3 className="flex flex-wrap items-center gap-x-3 gap-y-2 text-2xl font-semibold tracking-[-0.03em] text-chalk transition-colors duration-500 group-hover:text-amber group-focus-visible:text-amber sm:text-3xl lg:text-[2.5rem]">
                        {p.title}
                        {p.placeholder && (
                          <span className="rounded-full border border-amber/45 px-3 py-1 text-[0.6875rem] font-medium uppercase leading-none tracking-[0.22em] text-amber">
                            Placeholder
                          </span>
                        )}
                      </h3>

                      {interactive && (
                        <span className="shrink-0 text-mute transition-all duration-500 group-hover:translate-x-1 group-hover:text-amber">
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
                      )}
                    </div>

                    <p className="mt-2 text-sm font-medium text-mute lg:hidden">
                      {p.kind}
                    </p>

                    {/* Touch and small screens get the cover in the row itself */}
                    <div className="mt-5 overflow-hidden rounded-lg border border-line lg:hidden">
                      <div className="aspect-[4/3] w-full">
                        <Cover project={p} />
                      </div>
                    </div>

                    <p className="mt-5 max-w-[58ch] text-sm leading-relaxed text-mute sm:text-base">
                      {p.blurb}
                    </p>

                    <p className="label mt-5 lg:hidden">
                      {p.stack.join(" · ")}
                    </p>
                  </Row>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
