import { Category } from "@/lib/data";

const COLORS: Record<Category, { bg: string; accent: string; ink: string }> = {
  maquinas: { bg: "#ECE9DF", accent: "#C89640", ink: "#353D36" },
  veiculos: { bg: "#E6ECEB", accent: "#FCFCF7", ink: "#344D50" },
  tecnologia: { bg: "#E7E9EF", accent: "#626D88", ink: "#303C53" },
  mobiliario: { bg: "#EEE8E1", accent: "#B88961", ink: "#3C4C43" },
};

/** Original illustrations, not product photographs. */
export function AssetVisual({
  category,
  index = 0,
  className = "",
  rounded = "rounded-card",
  showLabel = true,
}: {
  category: Category;
  index?: number;
  className?: string;
  iconSize?: number;
  rounded?: string;
  showLabel?: boolean;
}) {
  const p = COLORS[category];
  return (
    <div
      className={`relative overflow-hidden ${rounded} ${className}`}
      style={{ background: p.bg }}
    >
      <svg
        viewBox="0 0 480 360"
        className="h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0 276H480M60 0V276M180 0V276M300 0V276M420 0V276"
          stroke={p.ink}
          strokeOpacity=".06"
        />
        <circle cx="370" cy="94" r="64" fill="white" fillOpacity=".4" />
        <ellipse
          cx="244"
          cy="293"
          rx="172"
          ry="13"
          fill={p.ink}
          fillOpacity=".09"
        />
        <g transform={`translate(${index % 2 ? -5 : 0} 0)`}>
          {category === "maquinas" && (
            <>
              <path d="M115 205H277V269H102V229Z" fill={p.accent} />
              <path d="M112 206L132 167H169V224H112Z" fill="#D5A853" />
              <path
                d="M182 128H268V207H258V139H192V207H182Z M174 120H281V133H174Z"
                fill={p.ink}
              />
              <path d="M199 196H230V214H190V205Z" fill="#303A34" />
              <path
                d="M220 184L242 173M239 171L248 181"
                stroke={p.ink}
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M279 108H292V278H279ZM299 105H308V281H299Z"
                fill="#424D43"
              />
              <path d="M305 270H381V282H305Z" fill="#515E51" />
              <path
                d="M115 220H150M113 231H143"
                stroke="#946C2D"
                strokeWidth="4"
              />
              <circle cx="145" cy="267" r="28" fill="#303B35" />
              <circle cx="145" cy="267" r="12" fill="#9EABA2" />
              <circle cx="252" cy="267" r="31" fill="#303B35" />
              <circle cx="252" cy="267" r="14" fill="#9EABA2" />
            </>
          )}
          {category === "veiculos" && (
            <>
              <path
                d="M76 165Q76 143 99 143H278Q295 143 308 159L365 213L388 222V269H76Z"
                fill={p.accent}
                stroke="#C3CFCA"
                strokeWidth="2"
              />
              <path d="M282 160L328 204H280V160Z" fill={p.ink} />
              <path d="M236 160H267V204H236Z" fill="#546F73" />
              <path
                d="M219 151V256M96 224H218M282 214V258"
                stroke="#CFD6D0"
                strokeWidth="2"
              />
              <path
                d="M239 216H250M284 216H295"
                stroke="#6E817D"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path d="M75 255H388V271H75Z" fill="#445655" />
              <rect
                x="371"
                y="227"
                width="17"
                height="10"
                rx="2"
                fill="#D6BB75"
              />
              <circle cx="140" cy="268" r="28" fill="#2C393A" />
              <circle cx="140" cy="268" r="13" fill="#A6B4B2" />
              <circle cx="332" cy="268" r="28" fill="#2C393A" />
              <circle cx="332" cy="268" r="13" fill="#A6B4B2" />
            </>
          )}
          {category === "tecnologia" && (
            <>
              <rect
                x="282"
                y="88"
                width="93"
                height="196"
                rx="7"
                fill={p.ink}
              />
              {[110, 143, 176, 209, 242].map((y) => (
                <g key={y}>
                  <rect
                    x="292"
                    y={y}
                    width="73"
                    height="24"
                    rx="3"
                    fill={p.accent}
                  />
                  <path
                    d={`M303 ${y + 8}H342M303 ${y + 15}H331`}
                    stroke="#BBC8CD"
                    strokeWidth="2"
                  />
                  <circle cx="354" cy={y + 12} r="3" fill="#C9E3AC" />
                </g>
              ))}
              <rect
                x="82"
                y="132"
                width="181"
                height="120"
                rx="6"
                fill="#3B475B"
              />
              <rect
                x="92"
                y="142"
                width="161"
                height="96"
                rx="2"
                fill="#B6C7C6"
              />
              <path
                d="M92 210L140 166L187 193L218 173L253 209V238H92Z"
                fill="#8CAAA9"
              />
              <path
                d="M76 258H270L291 278Q292 283 285 283H59Q52 283 55 278Z"
                fill="#7D8C9F"
              />
              <path d="M146 263H199L208 275H138Z" fill="#ADB9C4" />
            </>
          )}
          {category === "mobiliario" && (
            <>
              <path d="M89 183H389V198H89Z" fill={p.accent} />
              <path
                d="M100 198V288M375 198V288"
                stroke={p.ink}
                strokeWidth="9"
              />
              {[144, 252].map((x) => (
                <g key={x} transform={`translate(${x} 0)`}>
                  <rect
                    x="0"
                    y="129"
                    width="55"
                    height="76"
                    rx="15"
                    fill={p.ink}
                  />
                  <path d="M-4 214H60V225H-4Z" fill="#647369" />
                  <path
                    d="M27 226V276M3 286L27 276L53 286"
                    stroke="#46564B"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <circle cx="3" cy="287" r="5" fill="#344438" />
                  <circle cx="53" cy="287" r="5" fill="#344438" />
                </g>
              ))}
              <path d="M334 173V131" stroke="#657765" strokeWidth="3" />
              <path
                d="M334 153Q304 135 325 118Q344 130 334 153M336 148Q363 123 368 142Q359 162 336 161"
                fill="#82957A"
              />
              <path d="M321 160H351L347 184H325Z" fill="#D7C9B1" />
            </>
          )}
        </g>
      </svg>
      {showLabel && (
        <span className="absolute bottom-3 left-3 rounded bg-white/85 px-2 py-1 text-[10px] font-medium uppercase tracking-[.12em] text-text-secondary">
          Ilustração da categoria
        </span>
      )}
    </div>
  );
}
