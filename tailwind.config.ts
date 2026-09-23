import type { Config } from "tailwindcss";

/**
 * Tokens do ATIVOS B2B — direção "vinho e cobre".
 *
 * Três materiais: o vinho profundo (`brand`) das faixas institucionais, com
 * as curvas de nível em cobre; o creme (`surface`) do corpo do catálogo, que
 * faz a fotografia parecer impressa; e o cobre (`copper`), a assinatura da
 * marca — sobretítulo, destaque de título, contagem regressiva.
 *
 * A ação é o vinho sólido (`action`), não o cobre: o cobre não sustenta texto
 * branco em cima, e reservá-lo à assinatura evita que tudo vire destaque.
 * `copper-bright` só existe sobre o vinho; `copper` só sobre o creme.
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
          900: "#2A0E12",
          800: "#3A1418",
          700: "#4F1C21",
          600: "#6B2A2F",
        },
        action: {
          DEFAULT: "#6E1F27",
          hover: "#561820",
          pressed: "#43121A",
          bright: "#D9936A",
          soft: "#F6E6DA",
        },
        copper: {
          DEFAULT: "#9C4A22",
          bright: "#D9936A",
          solid: "#C9824F",
          soft: "#F6E6DA",
        },
        accent: {
          soft: "#F6E6DA",
          strong: "#C9824F",
        },
        auction: "#B42329",
        direct: "#1F5FBF",
        surface: {
          page: "#F6F0E9",
          card: "#FFFDFA",
          subtle: "#EFE6DC",
          raised: "#E7DCD0",
        },
        text: {
          primary: "#1E1315",
          secondary: "#54433F",
          muted: "#6E5D58",
          inverse: "#FFFFFF",
        },
        border: {
          subtle: "#E6DBCF",
          strong: "#D2C2B2",
          control: "#8C7A72",
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
        card: "0 1px 2px rgba(42, 14, 18, 0.06)",
        raised: "0 6px 16px rgba(42, 14, 18, 0.08)",
        elevated: "0 16px 34px rgba(42, 14, 18, 0.14)",
        float: "0 24px 60px rgba(42, 14, 18, 0.22)",
        modal: "0 24px 60px rgba(42, 14, 18, 0.28)",
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
