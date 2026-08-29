import { site } from "@/lib/content";

const bp = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * The mark, alive.
 *
 * The logo itself is a raster, so it is used as-is rather than redrawn — the
 * artwork stays exactly the artwork. What moves is a set of hairline traces
 * authored around it in the mark's own language: signals running up the
 * antennae, down the drips, and a slow breath on the glyph.
 *
 * Anchors the right of the fold, which was otherwise pure field, and fills
 * the band under the nav at the same time. Desktop only: on a phone the
 * headline already owns the viewport and this would crowd it.
 */
export default function LivingMark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[4vw] top-[8vh] hidden w-[13vw] max-w-[168px] select-none lg:block xl:right-[7vw]"
    >
      <div className="relative">
        <img
          src={`${bp}/brand/webloom-mark.png`}
          alt=""
          width={190}
          height={266}
          className="mark-breathe h-auto w-full"
        />

        {/* Signals. Drawn in the mark's own grammar rather than laid over it:
            thin verticals that run, pause, and run again. */}
        <svg
          viewBox="0 0 190 266"
          fill="none"
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          <g stroke="#00ffe0" strokeWidth="0.9" strokeLinecap="round">
            <path className="trace trace-1" d="M52 4v54" />
            <path className="trace trace-2" d="M96 2v42" />
            <path className="trace trace-3" d="M138 10v40" />
            <path className="trace trace-4" d="M44 214v48" />
            <path className="trace trace-5" d="M104 224v56" />
            <path className="trace trace-6" d="M150 208v44" />
          </g>
          <g fill="#00ffe0">
            <circle className="node node-1" cx="52" cy="4" r="2.6" />
            <circle className="node node-2" cx="96" cy="2" r="2.2" />
            <circle className="node node-3" cx="138" cy="10" r="2" />
          </g>
        </svg>
      </div>

    </div>
  );
}
