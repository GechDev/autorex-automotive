import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#ee0d09",
          foreground: "#ffffff",
        },
        header: {
          top: "#08194a",
        },
        secondary: {
          DEFAULT: "#f4f4f4",
          foreground: "#222222",
        },
        dark: {
          DEFAULT: "#001659",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#797979",
        },
        border: "#e0dcdc",
      },
      fontFamily: {
        sans: ["var(--font-yantramanav)", "system-ui", "sans-serif"],
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      fontSize: {
        base: ["16px", "1.7"],
        text: ["18px", "1.44"],
        "heading-1": ["75px", "1.05"],
        "heading-2": ["50px", "1.2"],
        "heading-3": ["28px", "1.25"],
        "heading-4": ["22px", "1.25"],
        "heading-5": ["18px", "1.25"],
        "heading-6": ["17px", "1.25"],
      },
      spacing: {
        "section": "70px",
        "section-sm": "50px",
        "section-lg": "100px",
      },
      container: {
        center: true,
        padding: "15px",
        screens: {
          DEFAULT: "1200px",
        },
      },
      borderRadius: {
        DEFAULT: "0",
        btn: "0",
      },
      boxShadow: {
        card: "0px 8px 32px 0px rgba(0, 0, 0, 0.12)",
        "card-hover": "0px 8px 32px 0px rgba(0, 0, 0, 0.15)",
        dropdown: "2px 2px 5px 1px rgba(0, 0, 0, 0.05), -2px 0px 5px 1px rgba(0, 0, 0, 0.05)",
      },
      transitionDuration: {
        DEFAULT: "300ms",
        fast: "200ms",
        slow: "500ms",
      },
      transitionTimingFunction: {
        DEFAULT: "ease",
      },
    },
  },
  plugins: [],
};

export default config;