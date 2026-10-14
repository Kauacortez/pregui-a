/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        monstro: {
          dark: '#0B0F19',
          card: '#161F30',
          accent: '#10B981',
          danger: '#EF4444',
          warning: '#F59E0B',
        }
      }
    },
  },
  plugins: [],
}
