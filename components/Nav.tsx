"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";

export default function Nav() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        stuck
          ? "border-b border-line/80 bg-void/70 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-5 sm:h-20 sm:px-8 lg:px-12"
      >
        <a
          href="#top"
          className="group flex items-baseline gap-2 text-[0.8rem] font-extrabold uppercase tracking-[0.3em] text-chalk transition-colors hover:text-amber sm:text-sm"
        >
          {site.name}
          <span className="h-1 w-1 rounded-full bg-mint transition-transform duration-300 group-hover:scale-[2.2]" />
        </a>

        <div className="flex items-center gap-5 sm:gap-9">
          <ul className="flex items-center gap-5 sm:gap-9">
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
