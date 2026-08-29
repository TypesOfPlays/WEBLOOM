import { about, site } from "@/lib/content";
import Reveal from "./Reveal";
import KineticText from "./KineticText";

export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <Reveal>
          <p className="display display-statement max-w-[22ch] text-chalk sm:max-w-[26ch] lg:max-w-[28ch]">
            <KineticText
              trigger="scroll"
              unit="word"
              segments={[{ text: about.statement }]}
            />
          </p>
        </Reveal>

        <div className="mt-16 grid gap-x-16 gap-y-14 border-t border-line pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <Reveal>
            <div className="flex flex-col gap-6">
              <span className="h-px w-full bg-line" />
              <p
                className={
                  "display display-title-sm " +
                  (site.ownerPlaceholder ? "italic text-faint" : "text-chalk")
                }
              >
                {site.owner}
              </p>
              <p className="text-sm text-mute">
                {site.role} ·{" "}
                <span className={site.locationPlaceholder ? "italic" : ""}>
                  {site.location}
                </span>
              </p>

              <dl className="mt-4">
                {about.practice.map((p) => (
                  <div
                    key={p.k}
                    className="border-t border-line py-4 last:border-b"
                  >
                    <dt className="label">{p.k}</dt>
                    <dd className="mt-2 max-w-[38ch] text-sm leading-relaxed text-mute">
                      {p.v}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                href="#contact"
                className="group -my-2 inline-flex w-fit items-center gap-2 py-2 text-sm font-medium text-chalk transition-colors duration-300 hover:text-amber"
              >
                Start a project
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  <svg width="13" height="13" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path
                      d="M4 14L14 4M14 4H6.5M14 4v7.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="flex flex-col gap-6">
              {about.body.map((para) => (
                <p
                  key={para.slice(0, 24)}
                  className="max-w-[68ch] text-base leading-[1.75] text-mute sm:text-lg"
                >
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-20">
          <div className="flex items-center gap-4">
            <span className="label">What that means in practice</span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <dl className="mt-4">
            {about.capabilities.map((c, i) => (
              <Reveal as="div" key={c.title} delay={i * 60}>
                <div className="group grid gap-x-10 gap-y-2 border-b border-line py-7 transition-colors duration-500 hover:border-amber/40 sm:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] sm:py-8">
                  <dt className="text-lg font-semibold tracking-[-0.02em] text-chalk transition-colors duration-500 group-hover:text-amber sm:text-xl">
                    {c.title}
                  </dt>
                  <dd className="max-w-[62ch] text-sm leading-relaxed text-mute sm:text-base">
                    {c.detail}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
