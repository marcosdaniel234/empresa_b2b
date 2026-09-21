import type { Config } from "tailwindcss";

/**
 * Tokens do ATIVOS B2B. A direção é de catálogo industrial: superfícies claras,
 * verde-petróleo como cor de ação, acento verde-limão e geometria compacta
 * (raios curtos, sombras quase imperceptíveis, bordas discretas).
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
          900: "#0F2E2A",
          800: "#123C36",
          700: "#17514A",
        },
        action: {
          DEFAULT: "#17624B",
          hover: "#124C3B",
          pressed: "#0D382D",
        },
        accent: {
          soft: "#D9ED92",
          strong: "#B9D64A",
        },
        surface: {
          page: "#F4F6F3",
          card: "#FFFFFF",
          subtle: "#EDF1EC",
          raised: "#E4EAE3",
        },
        text: {
          primary: "#16211D",
          secondary: "#4F6158",
          inverse: "#FFFFFF",
        },
        border: {
          subtle: "#DDE3DE",
          control: "#6E8377",
          strong: "#C3CCC5",
        },
        focus: {
          ring: "#225CBE",
        },
        success: {
          text: "#166044",
          surface: "#E8F3EC",
        },
        warning: {
          text: "#7A4B00",
          surface: "#FDF0D5",
        },
        danger: {
          text: "#A62C2C",
          surface: "#FCEBEC",
        },
        info: {
          text: "#2457A6",
          surface: "#EDF3FD",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["40px", { lineHeight: "46px", fontWeight: "700" }],
        "display-mobile": ["30px", { lineHeight: "36px", fontWeight: "700" }],
        "title-page": ["30px", { lineHeight: "38px", fontWeight: "700" }],
        "title-page-mobile": ["24px", { lineHeight: "31px", fontWeight: "700" }],
        "title-section": ["21px", { lineHeight: "28px", fontWeight: "700" }],
        "title-section-mobile": [
          "19px",
          { lineHeight: "26px", fontWeight: "700" },
        ],
        "title-card": ["16px", { lineHeight: "22px", fontWeight: "600" }],
        value: ["28px", { lineHeight: "34px", fontWeight: "700" }],
        "value-mobile": ["26px", { lineHeight: "32px", fontWeight: "700" }],
        body: ["15px", { lineHeight: "23px", fontWeight: "400" }],
        label: ["14px", { lineHeight: "20px", fontWeight: "500" }],
        metadata: ["13px", { lineHeight: "19px", fontWeight: "400" }],
        caption: ["12px", { lineHeight: "17px", fontWeight: "400" }],
        micro: ["11px", { lineHeight: "15px", fontWeight: "500" }],
      },
      borderRadius: {
        control: "6px",
        card: "6px",
        modal: "10px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 46, 42, 0.05)",
        elevated: "0 2px 10px rgba(15, 46, 42, 0.09)",
        modal: "0 18px 48px rgba(15, 46, 42, 0.22)",
      },
      maxWidth: {
        content: "1400px",
      },
      transitionDuration: {
        micro: "100ms",
        quick: "160ms",
        standard: "220ms",
        panel: "280ms",
        emphasis: "600ms",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.2, 0, 0, 1)",
        exit: "cubic-bezier(0.4, 0, 1, 1)",
      },
      keyframes: {
        "value-flash": {
          "0%": { backgroundColor: "#E8F3EC" },
          "100%": { backgroundColor: "transparent" },
        },
      },
      animation: {
        "value-flash": "value-flash 600ms linear",
      },
    },
  },
  plugins: [],
};

export default config;
