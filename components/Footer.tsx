import { site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative z-10 px-5 pb-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="font-display text-[0.8rem] font-extrabold uppercase tracking-[0.3em] text-chalk">
            {site.name}
          </span>
          <span className="h-1 w-1 rounded-full bg-mint" />
        </div>

        <p className="label tnum">
          © {new Date().getFullYear()} — Built with Next.js
        </p>

        <a
          href="#top"
          className="group inline-flex items-center gap-2 text-sm text-mute transition-colors hover:text-chalk"
        >
          Back to top
          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">
            <svg width="12" height="12" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d="M9 15V3M9 3L3.5 8.5M9 3l5.5 5.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
      </div>
    </footer>
  );
}
