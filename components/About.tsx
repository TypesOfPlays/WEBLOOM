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
          <p className="display max-w-[22ch] text-[2.1rem] leading-[1.06] text-chalk sm:max-w-[26ch] sm:text-5xl lg:max-w-[28ch] lg:text-[4.4rem]">
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
                  "display text-3xl sm:text-4xl " +
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
