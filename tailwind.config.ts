import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f5ff",
          100: "#e0ecff",
          500: "#335cff",
          700: "#1939c0",
          900: "#132766"
        }
      },
      boxShadow: {
        card: "0 8px 24px rgba(11, 17, 54, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
