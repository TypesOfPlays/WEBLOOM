/**
 * The vignette and floor that keep type off the brightest part of the field.
 *
 * This is legibility work, not decoration, so it lives in its own layer and is
 * painted ABOVE the live shader — otherwise the GPU field draws over its own
 * protection and the headline sits on a wall of blue.
 */
export default function FieldScrim() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ contain: "strict" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 92% at 62% 0%, transparent 30%, rgba(5,7,14,0.34) 62%, rgba(5,7,14,0.86) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[52vh]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(5,7,14,0.7) 55%, #05070e)",
        }}
      />
      {/* A soft floor under the hero copy specifically */}
      <div
        className="absolute inset-x-0 bottom-0 h-[34vh]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(5,7,14,0.55))",
        }}
      />
    </div>
  );
}
