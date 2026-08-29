import { hero, site } from "@/lib/content";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-7 pt-28 sm:px-8 sm:pb-9 lg:px-12"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <h1 className="hero-type font-display font-semibold text-chalk">
          <span className="block overflow-hidden">
            <span className="hero-line block">
              {hero.lineOne}{" "}
              <em className="accent-italic">
                {hero.accent}
              </em>
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line hero-line-2 block">{hero.lineTwo}</span>
          </span>
        </h1>

        <p className="mt-7 max-w-[46ch] text-base leading-relaxed text-mute sm:mt-8 sm:text-lg">
          {hero.lead}
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 sm:mt-12 lg:grid-cols-4">
          {hero.meta.map((m) => (
            <div key={m.k} className="flex flex-col gap-2">
              <dt className="label">{m.k}</dt>
              <dd
                className={`flex items-center gap-2 text-sm font-medium ${
                  m.placeholder ? "text-faint italic" : "text-chalk"
                }`}
              >
                {m.live && (
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                )}
                {m.v}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex items-center justify-between gap-4">
          <a
            href="#work"
            className="group inline-flex items-center gap-3 text-sm font-medium text-chalk transition-colors hover:text-amber"
          >
            <span className="scroll-hint relative flex h-9 w-5 items-start justify-center overflow-hidden rounded-full border border-line">
              <span className="mt-1.5 block h-1.5 w-[3px] rounded-full bg-amber" />
            </span>
            Selected work
          </a>
          <span className="label hidden sm:block tnum">
            {site.timezone}
          </span>
        </div>
      </div>
    </section>
  );
}
