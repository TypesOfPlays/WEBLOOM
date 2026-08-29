"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";

const bp = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Nav() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-8 sm:pt-4 lg:px-12">
      {/*
        Glass here is doing legibility work, not decoration: the bar sits over
        a live shader field whose brightness changes under it, and a flat tint
        alone would leave the links swimming. The blur is bounded to this bar
        rather than applied at page scale.
      */}
      <nav
        aria-label="Primary"
        className={`mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-4 rounded-2xl border px-4 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 sm:h-16 sm:gap-6 sm:px-6 ${
          stuck
            ? "border-white/[0.09] bg-void/70"
            : "border-white/[0.06] bg-void/45"
        }`}
        style={{
          boxShadow: stuck
            ? "inset 0 1px 0 0 rgba(255,255,255,0.07), 0 20px 44px -28px rgba(2,4,10,0.95)"
            : "inset 0 1px 0 0 rgba(255,255,255,0.05), 0 14px 34px -30px rgba(2,4,10,0.8)",
        }}
      >
        <a
          href="#top"
          className="group -my-2 flex items-center gap-2.5 py-2 text-chalk transition-colors hover:text-amber sm:gap-3"
        >
          {/* The lockup's own wordmark is not used: WEBLOOM is already set in
              Rader beside it, and repeating it reads as a duplicate. */}
          <img
            src={`${bp}/brand/webloom-mark-compact.png`}
            alt=""
            aria-hidden="true"
            width={190}
            height={187}
            className="h-5 w-auto transition-transform duration-500 ease-out group-hover:scale-105 sm:h-6"
          />
          <span className="flex items-baseline gap-1.5 font-display text-[0.72rem] font-extrabold uppercase tracking-[0.18em] sm:gap-2 sm:text-sm sm:tracking-[0.3em]">
            {site.name}
            <span className="h-1 w-1 rounded-full bg-mint transition-transform duration-300 group-hover:scale-[2.2]" />
          </span>
        </a>

        <div className="flex items-center gap-4 sm:gap-8">
          <ul className="flex items-center gap-4 sm:gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="label relative py-2 transition-colors duration-300 hover:text-chalk"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {site.availability.open && (
            <span className="hidden items-center gap-2 rounded-full border border-line bg-shelf/60 py-1.5 pl-2.5 pr-3.5 backdrop-blur md:inline-flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
              </span>
              <span className="text-[0.6875rem] font-medium tracking-[0.14em] text-mute">
                {site.availability.detail}
              </span>
            </span>
          )}
        </div>
      </nav>
    </header>
  );
}
