/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#00f0ff',
          purple: '#b347ff',
          green: '#00ff88',
          pink: '#ff00ff',
          lila: '#A78BFA',
        },
        dark: {
          bg: '#0B0714',
          card: '#22173A',
          hover: '#1A1033',
        }
      },
      boxShadow: {
        'neon-blue': '0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 30px #00f0ff',
        'neon-purple': '0 0 10px #b347ff, 0 0 20px #b347ff, 0 0 30px #b347ff',
        'neon-green': '0 0 10px #00ff88, 0 0 20px #00ff88, 0 0 30px #00ff88',
        'neon-lila': '0 0 10px #A78BFA, 0 0 20px #A78BFA, 0 0 30px #A78BFA',
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 }
        },
        'glow': {
          'from': { textShadow: '0 0 10px #A78BFA, 0 0 20px #A78BFA' },
          'to': { textShadow: '0 0 20px #A78BFA, 0 0 30px #A78BFA, 0 0 40px #A78BFA' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [],
}

