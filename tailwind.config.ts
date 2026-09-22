import type { Config } from "tailwindcss";

/**
 * Tokens do ATIVOS B2B. Paleta grafite/aço com ação em âmbar de segurança —
 * a cor de sinalização de equipamento pesado, não o verde de SaaS genérico.
 * Geometria reta (raios de 2-4px), bordas de aço bem definidas, tipografia
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
          900: "#14181B",
          800: "#1D2327",
          700: "#262E33",
        },
        action: {
          DEFAULT: "#B45309",
          hover: "#92400E",
          pressed: "#78350F",
        },
        accent: {
          soft: "#F5C451",
          strong: "#E2A227",
        },
        surface: {
          page: "#F1F2F3",
          card: "#FFFFFF",
          subtle: "#E7E9EA",
          raised: "#DADDE0",
        },
        text: {
          primary: "#16191C",
          secondary: "#454E52",
          muted: "#5C666B",
          inverse: "#FFFFFF",
        },
        border: {
          subtle: "#D4D8DA",
          strong: "#B7BEC2",
          control: "#6B767B",
        },
        focus: {
          ring: "#225CBE",
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
        card: "0 1px 2px rgba(20, 24, 27, 0.07)",
        elevated: "0 4px 14px rgba(20, 24, 27, 0.14)",
        modal: "0 18px 48px rgba(20, 24, 27, 0.28)",
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
    },
  },
  plugins: [],
};

export default config;
