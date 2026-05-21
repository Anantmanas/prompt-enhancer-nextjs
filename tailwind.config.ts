import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111318",
        mist: "#f6f8fb",
        graphite: "#2a2f3a",
        line: "rgba(17, 19, 24, 0.12)",
        glass: "rgba(255, 255, 255, 0.72)",
        cyan: "#3bb7c8",
        lime: "#b6d66b",
        coral: "#ff8066"
      },
      boxShadow: {
        glass: "0 24px 80px rgba(31, 38, 55, 0.14)",
        focus: "0 0 0 4px rgba(59, 183, 200, 0.18)"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
