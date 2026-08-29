import { contact, site, socials } from "@/lib/content";
import Reveal from "./Reveal";
import KineticText from "./KineticText";
import Magnetic from "./Magnetic";

export default function Contact() {
  const mailto =
    "mailto:" +
    site.email +
    "?subject=" +
    encodeURIComponent("Project enquiry via WEBLOOM");

  return (
    <section
      id="contact"
      className="relative z-10 scroll-mt-24 px-5 pb-16 pt-24 sm:px-8 sm:pt-32 lg:px-12"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <Reveal>
          <h2 className="display text-[clamp(2.9rem,9vw,8rem)] leading-[0.9] text-chalk">
            <KineticText
              trigger="scroll"
              segments={[
                { text: contact.headline[0] },
                { text: contact.headline[1], accent: true },
              ]}
            />
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-8 max-w-[52ch] text-base leading-relaxed text-mute sm:text-lg">
            {contact.body}
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-12 border-t border-line pt-10 sm:mt-16">
            <a
              href={mailto}
              className="group inline-flex max-w-full items-center gap-4 sm:gap-6"
            >
              <Magnetic strength={0.45} radius={130} className="shrink-0">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber text-void transition-transform duration-500 ease-out group-hover:scale-110 sm:h-16 sm:w-16">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 18 18"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 14L14 4M14 4H6.5M14 4v7.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                </span>
              </Magnetic>
              <span
                className={
                  "min-w-0 break-all text-xl font-medium tracking-[-0.02em] underline decoration-line underline-offset-[0.3em] transition-colors duration-300 group-hover:decoration-amber sm:text-3xl lg:text-4xl " +
                  (site.emailPlaceholder
                    ? "italic text-faint"
                    : "text-chalk group-hover:text-amber")
                }
              >
                {site.email}
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.placeholder ? undefined : s.href}
                  aria-disabled={s.placeholder ? true : undefined}
                  target={s.placeholder ? undefined : "_blank"}
                  rel="noreferrer noopener"
                  className={
                    "group inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300 " +
                    (s.placeholder
                      ? "cursor-not-allowed italic text-faint"
                      : "cursor-pointer text-mute hover:text-mint")
                  }
                >
                  {s.label}
                  {!s.placeholder && (
                    <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 18 18"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M4 14L14 4M14 4H6.5M14 4v7.5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
