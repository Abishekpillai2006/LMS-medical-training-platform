/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Medical premium dark/light HSL palettes
        medical: {
          50: '#f0f9fa',
          100: '#dcf2f5',
          200: '#bee3eb',
          300: '#92ccdb',
          400: '#5faec4',
          500: '#3d8ea7',
          600: '#35758d',
          700: '#306175',
          800: '#2d5162',
          900: '#294553',
          950: '#172b36', // Deep Obsidian Teal (Primary Dark BG)
        },
        accent: {
          teal: '#14b8a6',   // Bright active teal
          mint: '#10b981',   // Healing emerald
          clinical: '#06b6d4' // Active cyan clinical indicator
        },
        dark: {
          card: '#1f3541',
          bg: '#0f1e26',
          border: '#2e4956'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}
