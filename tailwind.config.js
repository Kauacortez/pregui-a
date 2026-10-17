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
      },
      animation: {
        'shake': 'shake 0.5s ease-in-out infinite',
        'breathe': 'breathe 3s ease-in-out infinite',
        'victory': 'victory 0.8s ease-in-out infinite alternate',
        'boxing-body': 'boxingBody 1.6s infinite ease-in-out',
        'punch-left': 'punchLeft 0.8s infinite ease-in-out',
        'punch-right': 'punchRight 0.8s infinite ease-in-out',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-8px) rotate(-1deg)' },
          '40%, 80%': { transform: 'translateX(8px) rotate(1deg)' },
        },
        breathe: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-6px) scale(1.02)' },
        },
        victory: {
          '0%': { transform: 'scale(1) rotate(-4deg)' },
          '100%': { transform: 'scale(1.08) rotate(4deg)' },
        },
        boxingBody: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateX(-4px) translateY(-2px) rotate(-2deg)' },
          '50%': { transform: 'translateY(0) rotate(0deg)' },
          '75%': { transform: 'translateX(4px) translateY(-2px) rotate(2deg)' },
        },
        punchLeft: {
          '0%, 42%, 100%': { transform: 'translateX(0) translateY(0) scale(1) rotate(0deg)' },
          '8%': { transform: 'translateX(0) translateY(2px) scale(0.95) rotate(0deg)' },
          '18%': { transform: 'translateX(-5px) translateY(-10px) scale(1.25, 1.1) rotate(-10deg)' },
          '26%': { transform: 'translateX(-3px) translateY(-6px) scale(1.15, 1.05) rotate(-6deg)' },
          '36%': { transform: 'translateX(0) translateY(0) scale(1) rotate(0deg)' },
        },
        punchRight: {
          '0%, 48%, 100%': { transform: 'translateX(0) translateY(0) scale(1) rotate(0deg)' },
          '55%': { transform: 'translateX(0) translateY(2px) scale(0.95) rotate(0deg)' },
          '65%': { transform: 'translateX(5px) translateY(-10px) scale(1.25, 1.1) rotate(10deg)' },
          '73%': { transform: 'translateX(3px) translateY(-6px) scale(1.15, 1.05) rotate(6deg)' },
          '83%': { transform: 'translateX(0) translateY(0) scale(1) rotate(0deg)' },
        },
      }
    },
  },
  plugins: [],
}
