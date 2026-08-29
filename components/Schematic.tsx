import type { Schematic as Kind } from "@/lib/content";

/**
 * Authored SVG schematics, one per project shape. Deliberately drawn as
 * wireframes: a schematic reads as "this is the structure I built" and can
 * never be mistaken for a screenshot of a product that does not exist.
 */

const L = "#28324a"; // hairline
const T = "#3d4a68"; // filled block
const A = "#ffab00";
const M = "#00ffe0";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      <rect x="0.5" y="0.5" width="399" height="299" rx="9" fill="#080c16" />
      <path d="M0 26h400" stroke={L} strokeWidth="1" />
      <circle cx="16" cy="13.5" r="2.5" fill={T} />
      <circle cx="26" cy="13.5" r="2.5" fill={T} />
      <circle cx="36" cy="13.5" r="2.5" fill={T} />
      <rect x="150" y="9" width="100" height="9" rx="4.5" fill="#131a2a" />
      {children}
      <rect
        x="0.5"
        y="0.5"
        width="399"
        height="299"
        rx="9"
        stroke={L}
        strokeWidth="1"
      />
    </svg>
  );
}

function Commerce() {
  const tiles: React.ReactElement[] = [];
  for (let c = 0; c < 3; c++) {
    for (let r = 0; r < 2; r++) {
      tiles.push(
        <g key={"t" + c + r}>
          <rect
            x={112 + c * 84}
            y={44 + r * 116}
            width="70"
            height="78"
            rx="5"
            fill="#0d1424"
            stroke={L}
          />
          <rect
            x={112 + c * 84}
            y={128 + r * 116}
            width="46"
            height="6"
            rx="3"
            fill={T}
          />
          <rect
            x={112 + c * 84}
            y={140 + r * 116}
            width="26"
            height="6"
            rx="3"
            fill={c === 1 && r === 0 ? A : "#182034"}
          />
        </g>,
      );
    }
  }

  return (
    <Frame>
      <path d="M96 26v274" stroke={L} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="16" y={46 + i * 30} width="64" height="7" rx="3.5" fill={T} />
          <rect
            x="16"
            y={59 + i * 30}
            width="40"
            height="5"
            rx="2.5"
            fill="#182034"
          />
        </g>
      ))}
      {tiles}
      <rect
        x="300"
        y="26"
        width="100"
        height="274"
        fill="#0a1120"
        stroke={A}
        strokeWidth="1"
      />
      <rect x="316" y="46" width="52" height="7" rx="3.5" fill={A} />
      {[0, 1].map((i) => (
        <g key={i}>
          <rect
            x="316"
            y={70 + i * 44}
            width="30"
            height="30"
            rx="4"
            fill="#0f1728"
            stroke={L}
          />
          <rect
            x="354"
            y={76 + i * 44}
            width="32"
            height="5"
            rx="2.5"
            fill={T}
          />
          <rect
            x="354"
            y={87 + i * 44}
            width="20"
            height="5"
            rx="2.5"
            fill="#182034"
          />
        </g>
      ))}
      <rect x="316" y="252" width="68" height="22" rx="11" fill={A} />
    </Frame>
  );
}

function Dashboard() {
  return (
    <Frame>
      <path d="M64 26v274" stroke={L} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x="16"
          y={46 + i * 22}
          width={i === 0 ? 32 : 26}
          height="7"
          rx="3.5"
          fill={i === 0 ? M : T}
        />
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x={80 + i * 108}
            y="42"
            width="96"
            height="48"
            rx="6"
            fill="#0d1424"
            stroke={L}
          />
          <rect
            x={92 + i * 108}
            y="54"
            width="28"
            height="5"
            rx="2.5"
            fill="#1e2739"
          />
          <rect
            x={92 + i * 108}
            y="66"
            width="46"
            height="11"
            rx="3"
            fill={i === 0 ? M : T}
          />
        </g>
      ))}
      <rect
        x="80"
        y="102"
        width="304"
        height="96"
        rx="6"
        fill="#0d1424"
        stroke={L}
      />
      <path
        d="M94 178l38-22 34 12 36-34 40 16 34-30 38 8 26-18V190H94z"
        fill="url(#schematic-area)"
        opacity="0.3"
      />
      <path
        d="M94 178l38-22 34 12 36-34 40 16 34-30 38 8 26-18"
        stroke={M}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="schematic-area" x1="0" y1="110" x2="0" y2="190">
          <stop stopColor={M} stopOpacity="0.6" />
          <stop offset="1" stopColor={M} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <path d={"M80 " + (214 + i * 22) + "h304"} stroke={L} />
          <rect x="92" y={222 + i * 22} width="54" height="6" rx="3" fill={T} />
          <rect
            x="176"
            y={222 + i * 22}
            width="86"
            height="6"
            rx="3"
            fill="#182034"
          />
          <rect
            x="300"
            y={222 + i * 22}
            width="30"
            height="6"
            rx="3"
            fill={i === 1 ? A : "#182034"}
          />
        </g>
      ))}
    </Frame>
  );
}

function Editorial() {
  return (
    <Frame>
      <rect x="28" y="52" width="188" height="15" rx="4" fill="#e6ecf7" />
      <rect x="28" y="76" width="140" height="15" rx="4" fill="#e6ecf7" />
      <rect x="176" y="76" width="62" height="15" rx="4" fill={A} />
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x="28"
          y={112 + i * 12}
          width={i === 2 ? 108 : 168}
          height="5"
          rx="2.5"
          fill="#1e2739"
        />
      ))}
      <rect
        x="28"
        y="168"
        width="72"
        height="20"
        rx="10"
        fill="#0f1728"
        stroke={M}
      />
      <rect
        x="254"
        y="52"
        width="118"
        height="152"
        rx="6"
        fill="#0d1424"
        stroke={L}
      />
      <circle cx="313" cy="112" r="26" stroke={A} strokeWidth="1.25" />
      <circle cx="313" cy="112" r="15" fill="#101a2c" />
      <path d="M0 232h400" stroke={L} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x={28 + i * 118}
            y="250"
            width="14"
            height="5"
            rx="2.5"
            fill={M}
          />
          <rect x={28 + i * 118} y="264" width="88" height="6" rx="3" fill={T} />
          <rect
            x={28 + i * 118}
            y="276"
            width="60"
            height="5"
            rx="2.5"
            fill="#182034"
          />
        </g>
      ))}
    </Frame>
  );
}

function Product() {
  return (
    <Frame>
      <path d="M84 26v274" stroke={L} />
      <rect x="16" y="44" width="20" height="20" rx="6" fill={M} />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x="16"
          y={80 + i * 20}
          width={i === 1 ? 46 : 36}
          height="6"
          rx="3"
          fill={i === 1 ? T : "#182034"}
        />
      ))}
      <rect x="16" y="264" width="52" height="6" rx="3" fill="#182034" />
      <rect x="104" y="46" width="96" height="9" rx="4" fill="#e6ecf7" />
      <rect
        x="104"
        y="72"
        width="280"
        height="104"
        rx="7"
        fill="#0d1424"
        stroke={L}
      />
      <rect x="120" y="90" width="44" height="5" rx="2.5" fill="#1e2739" />
      <rect
        x="120"
        y="102"
        width="248"
        height="22"
        rx="5"
        fill="#0a1120"
        stroke={L}
      />
      <rect x="128" y="110" width="70" height="6" rx="3" fill="#232d43" />
      <rect x="120" y="134" width="44" height="5" rx="2.5" fill="#1e2739" />
      <rect
        x="120"
        y="146"
        width="248"
        height="22"
        rx="5"
        fill="#0a1120"
        stroke={M}
      />
      <rect x="128" y="154" width="104" height="6" rx="3" fill="#2c3852" />
      <rect x="360" y="152" width="1" height="10" fill={M} />
      <rect x="104" y="192" width="104" height="24" rx="12" fill={A} />
      <rect
        x="216"
        y="192"
        width="76"
        height="24"
        rx="12"
        fill="#0f1728"
        stroke={L}
      />
      {[0, 1].map((i) => (
        <g key={i}>
          <path d={"M104 " + (240 + i * 28) + "h280"} stroke={L} />
          <circle cx="116" cy={254 + i * 28} r="5" stroke={T} />
          <rect x="130" y={251 + i * 28} width="92" height="6" rx="3" fill={T} />
          <rect
            x="330"
            y={251 + i * 28}
            width="42"
            height="6"
            rx="3"
            fill="#182034"
          />
        </g>
      ))}
    </Frame>
  );
}

export default function Schematic({ kind }: { kind: Kind }) {
  switch (kind) {
    case "commerce":
      return <Commerce />;
    case "dashboard":
      return <Dashboard />;
    case "editorial":
      return <Editorial />;
    case "product":
      return <Product />;
    default:
      return null;
  }
}
