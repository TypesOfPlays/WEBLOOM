"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A fallback for the contact address.
 *
 * `mailto:` only does anything when the machine has a default mail client
 * registered. On a desktop where the visitor lives in webmail, the big email
 * link silently does nothing — and that link is the site's only conversion
 * action, so it cannot be the single path. This copies the address instead,
 * which works everywhere and says so.
 */
export default function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      // Clipboard API needs a secure context and permission; fall back to the
      // old selection trick before admitting defeat.
      try {
        const ta = document.createElement("textarea");
        ta.value = email;
        ta.setAttribute("readonly", "");
        ta.style.cssText = "position:fixed;top:0;left:-9999px";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        ta.remove();
        setState(ok ? "copied" : "failed");
      } catch {
        setState("failed");
      }
    }
    timer.current = setTimeout(() => setState("idle"), 2400);
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={copy}
        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-medium text-mute transition-colors duration-300 hover:border-mint/50 hover:text-mint"
      >
        {state === "copied" ? (
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path
              d="M3.5 9.5l3.5 3.5 7.5-8"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <rect x="6.25" y="6.25" width="8" height="8" rx="1.75" stroke="currentColor" strokeWidth="1.4" />
            <path
              d="M11.75 3.75H4.5c-.7 0-1.25.56-1.25 1.25v7.25"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        )}
        {state === "copied"
          ? "Copied"
          : state === "failed"
            ? "Select and copy"
            : "Copy address"}
      </button>

      <span aria-live="polite" className="sr-only">
        {state === "copied" ? `${email} copied to clipboard` : ""}
      </span>
    </div>
  );
}
