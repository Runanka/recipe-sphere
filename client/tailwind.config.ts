import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#1E3A8A",
        secondary: "#3B82F6",
        accent1: "#FBBF24",
        accent2: "#EF4444",
        background: "#F3F4F6",
        card: "#FFFFFF",
        "text-color": "#1F2937",
        "secondary-text-color": "#6B7280",
        success: "#10B981",
        info: "#0EA5E9",
        warning: "#F97316",
      },
    },
  },
  plugins: [],
};
export default config;
