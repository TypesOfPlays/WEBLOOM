/**
 * Renders "React · Next.js · TypeScript" so a wrap never strands the
 * separator at the end of a line. Each item carries its own leading dot and
 * is unbreakable, so the line breaks BEFORE a dot, never after one.
 */
export default function DotList({
  items,
  className = "",
  dotClassName = "text-faint",
}: {
  items: string[];
  className?: string;
  dotClassName?: string;
}) {
  return (
    <span className={`flex flex-wrap gap-x-1 ${className}`}>
      {items.map((item, i) => (
        <span key={item} className="whitespace-nowrap">
          {i > 0 && <span className={dotClassName}>·&nbsp;</span>}
          {item}
        </span>
      ))}
    </span>
  );
}
