"use client";

import { useState } from "react";
import { projects, type Project } from "@/lib/content";
import Schematic from "./Schematic";
import Reveal from "./Reveal";

const bp = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function Cover({ project, eager }: { project: Project; eager?: boolean }) {
  if (!project.image) {
    return <Schematic kind={project.schematic} />;
  }
  return (
    <img
      src={`${bp}/work/${project.image}-1600.jpg`}
      srcSet={`${bp}/work/${project.image}-800.jpg 800w, ${bp}/work/${project.image}-1600.jpg 1600w`}
      sizes="(max-width: 1023px) 92vw, 30rem"
      alt={`The ${project.title} site, as built`}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className="h-full w-full object-cover"
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

        <div className="mt-12 grid gap-x-16 lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] lg:items-start">
          {/* Sticky cover — desktop only; the rows carry their own on touch */}
          <div className="hidden lg:block lg:sticky lg:top-28">
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
                    <Cover project={p} eager={i === 0} />
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-6 border-t border-line pt-4">
                <span className="text-sm font-medium text-chalk">
                  {projects[active].kind}
                </span>
                <span className="label">
                  {projects[active].stack.join(" · ")}
                </span>
              </div>
            </Reveal>
          </div>

          <ul>
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
                          onFocus: () => setActive(i),
                        }
                      : {})}
                    onMouseEnter={() => setActive(i)}
                    className={
                      "group block border-b border-line py-8 transition-colors duration-500 sm:py-10 " +
                      (interactive ? "cursor-pointer" : "")
                    }
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
                      <h3 className="flex flex-wrap items-center gap-x-3 gap-y-2 text-2xl font-semibold tracking-[-0.03em] text-chalk transition-colors duration-500 group-hover:text-amber group-focus-visible:text-amber sm:text-3xl lg:text-[2.5rem]">
                        {p.title}
                        {p.placeholder && (
                          <span className="rounded-full border border-amber/45 px-2.5 py-1 text-[0.5625rem] font-semibold uppercase tracking-[0.18em] text-amber">
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
                        <Cover project={p} eager={i === 0} />
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
