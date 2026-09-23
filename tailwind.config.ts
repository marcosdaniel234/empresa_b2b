import type { Config } from "tailwindcss";

/**
 * Tokens do ATIVOS B2B — direção "Atlantic Industrial".
 *
 * Três materiais: o azul-atlântico profundo (`brand`) das faixas
 * institucionais, como casco de navio e aço pintado de estaleiro; o concreto
 * frio (`surface`) do corpo do catálogo, neutro para a fotografia dos lotes;
 * e o verde-mar (`accent`), a assinatura da marca — sobretítulo, índice das
 * seções, destaque de título, contagem regressiva.
 *
 * A ação é o azul-petróleo sólido (`action`), não o verde-mar: reservar o
 * verde-mar à assinatura evita que tudo vire destaque. `accent-bright` só
 * existe sobre o azul profundo; `accent` só sobre o concreto.
 *
 * Razões de contraste em scripts/check-contrast.mjs — todas passam WCAG AA.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#0B1D2A",
          800: "#10293B",
          700: "#173A52",
          600: "#22506F",
        },
        action: {
          DEFAULT: "#0E4A6E",
          hover: "#0B3C5A",
          pressed: "#082F47",
          bright: "#7FCFC6",
          soft: "#E0EEF2",
        },
        accent: {
          DEFAULT: "#1B6E6C",
          bright: "#7FCFC6",
          solid: "#4FB3AA",
          soft: "#DDF0EE",
          strong: "#4FB3AA",
        },
        auction: "#B42329",
        direct: "#1F5FBF",
        surface: {
          page: "#F1F4F5",
          card: "#FCFDFD",
          subtle: "#E7EDF0",
          raised: "#DCE4E8",
        },
        text: {
          primary: "#0E1B24",
          secondary: "#3F4F5A",
          muted: "#526069",
          inverse: "#FFFFFF",
        },
        border: {
          subtle: "#D9E1E5",
          strong: "#BFCBD2",
          control: "#7A8A94",
        },
        focus: {
          ring: "#1D4ED8",
        },
        success: {
          text: "#047857",
          surface: "#ECFDF5",
          solid: "#047857",
        },
        warning: {
          text: "#92400E",
          surface: "#FEF3C7",
        },
        danger: {
          text: "#B91C1C",
          surface: "#FEE2E2",
        },
        info: {
          text: "#1D4ED8",
          surface: "#EFF4FE",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "title-page": ["26px", { lineHeight: "32px", fontWeight: "700" }],
        "title-page-mobile": ["21px", { lineHeight: "27px", fontWeight: "700" }],
        "title-section": ["18px", { lineHeight: "24px", fontWeight: "700" }],
        "title-section-mobile": [
          "16px",
          { lineHeight: "22px", fontWeight: "700" },
        ],
        "title-card": ["15px", { lineHeight: "20px", fontWeight: "600" }],
        value: ["24px", { lineHeight: "30px", fontWeight: "700" }],
        "value-mobile": ["22px", { lineHeight: "28px", fontWeight: "700" }],
        body: ["14px", { lineHeight: "21px", fontWeight: "400" }],
        label: ["13px", { lineHeight: "18px", fontWeight: "500" }],
        metadata: ["13px", { lineHeight: "19px", fontWeight: "400" }],
        caption: ["12px", { lineHeight: "17px", fontWeight: "400" }],
        micro: ["11px", { lineHeight: "15px", fontWeight: "500" }],
      },
      borderRadius: {
        control: "8px",
        card: "10px",
        panel: "14px",
        modal: "14px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11, 29, 42, 0.06)",
        raised: "0 6px 16px rgba(11, 29, 42, 0.08)",
        elevated: "0 16px 34px rgba(11, 29, 42, 0.14)",
        float: "0 24px 60px rgba(11, 29, 42, 0.22)",
        modal: "0 24px 60px rgba(11, 29, 42, 0.28)",
      },
      maxWidth: {
        content: "1360px",
      },
      transitionDuration: {
        micro: "100ms",
        quick: "140ms",
        standard: "200ms",
        panel: "260ms",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.2, 0, 0, 1)",
        exit: "cubic-bezier(0.4, 0, 1, 1)",
      },
      keyframes: {
        "panel-down": {
          from: { opacity: "0", transform: "translateY(-6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "rule-in": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        "rise": {
          from: { opacity: "0", transform: "translateY(22px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "ken-burns": {
          from: { transform: "scale(1.08)" },
          to: { transform: "scale(1)" },
        },
      },
      animation: {
        "panel-down": "panel-down 200ms cubic-bezier(0.2, 0, 0, 1) both",
        "fade-up": "fade-up 260ms cubic-bezier(0.2, 0, 0, 1) both",
        "fade-in": "fade-in 180ms linear both",
        "rule-in": "rule-in 520ms cubic-bezier(0.2, 0, 0, 1) both",
        rise: "rise 720ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "ken-burns": "ken-burns 7s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
