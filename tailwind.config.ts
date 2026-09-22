import type { Config } from "tailwindcss";

/**
 * Tokens do ATIVOS B2B. Paleta quente de leilão industrial: neutros em areia
 * e barro (no lugar dos cinzas frios), grafite amadeirado para as faixas
 * escuras e laranja de segurança como cor de ação — a sinalização usada em
 * pátio de equipamento pesado. Geometria reta (raios de 2-4px), tipografia
 * IBM Plex (ver app/layout.tsx). Razões de contraste calculadas em
 * scripts/check-contrast.mjs — todas as combinações de texto passam AA.
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
          900: "#1F1813",
          800: "#2E241C",
          700: "#3D3025",
        },
        action: {
          DEFAULT: "#B03E0A",
          hover: "#8C300A",
          pressed: "#6E2607",
        },
        accent: {
          soft: "#FBBF24",
          strong: "#F59E0B",
          glow: "#EA580C",
        },
        surface: {
          page: "#FBF4EC",
          card: "#FFFFFF",
          subtle: "#F5E7D8",
          raised: "#F0E1CE",
        },
        text: {
          primary: "#1A1512",
          secondary: "#4A4038",
          muted: "#6B5D52",
          inverse: "#FFFFFF",
        },
        border: {
          subtle: "#E7D7C4",
          strong: "#D2BA9E",
          control: "#8A7663",
        },
        focus: {
          ring: "#1D4ED8",
        },
        success: {
          text: "#1B7A43",
          surface: "#E5F3EA",
        },
        warning: {
          text: "#7A5D00",
          surface: "#FBF1D2",
        },
        danger: {
          text: "#A62C2C",
          surface: "#FBE9EA",
        },
        info: {
          text: "#22508F",
          surface: "#EAF1FB",
        },
      },
      fontFamily: {
        sans: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
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
        control: "3px",
        card: "3px",
        modal: "4px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(61, 48, 37, 0.10)",
        elevated: "0 6px 18px rgba(61, 48, 37, 0.16)",
        modal: "0 18px 48px rgba(31, 24, 19, 0.32)",
      },
      maxWidth: {
        content: "1440px",
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
      },
      animation: {
        "panel-down": "panel-down 200ms cubic-bezier(0.2, 0, 0, 1) both",
        "fade-up": "fade-up 260ms cubic-bezier(0.2, 0, 0, 1) both",
        "fade-in": "fade-in 180ms linear both",
        "rule-in": "rule-in 320ms cubic-bezier(0.2, 0, 0, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
