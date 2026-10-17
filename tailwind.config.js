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
          '0%, 42%, 100%': { transform: 'scale(1) translateY(0)', filter: 'drop-shadow(0 0 0 rgba(0,0,0,0))' },
          '8%': { transform: 'scale(0.9) translateY(2px)' },
          '18%': { transform: 'scale(1.55) translateY(-8px)', filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.45))' },
          '26%': { transform: 'scale(1.3) translateY(-4px)', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' },
          '36%': { transform: 'scale(1) translateY(0)', filter: 'drop-shadow(0 0 0 rgba(0,0,0,0))' },
        },
        punchRight: {
          '0%, 48%, 100%': { transform: 'scale(1) translateY(0)', filter: 'drop-shadow(0 0 0 rgba(0,0,0,0))' },
          '55%': { transform: 'scale(0.9) translateY(2px)' },
          '65%': { transform: 'scale(1.55) translateY(-8px)', filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.45))' },
          '73%': { transform: 'scale(1.3) translateY(-3px)', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' },
          '83%': { transform: 'scale(1) translateY(0)', filter: 'drop-shadow(0 0 0 rgba(0,0,0,0))' },
        },
      }
    },
  },
  plugins: [],
}
