/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f0f10",
        secondary: "#1a1a1d",
        card: "#222226",
        accent: "#8a8a95"
      }
    }
  },
  plugins: []
}