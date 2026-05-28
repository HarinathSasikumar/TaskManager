/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        primary: {
          50: '#f0eeff',
          100: '#e4e0ff',
          200: '#cdc5ff',
          300: '#ae9fff',
          400: '#8b72ff',
          500: '#6C63FF',
          600: '#5a4de0',
          700: '#4a3db8',
          800: '#3c3195',
          900: '#322c7a',
        },
        cyan: {
          400: '#22d3ee',
          500: '#00D4FF',
        },
        nebula: {
          bg: '#050510',
          surface: '#0a0a1f',
          card: '#0f0f2d',
          border: 'rgba(255,255,255,0.07)',
          glow: 'rgba(108,99,255,0.4)',
        }
      },
      backgroundImage: {
        'aurora': 'radial-gradient(ellipse at 20% 50%, rgba(108,99,255,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0,212,255,0.1) 0%, transparent 60%), radial-gradient(ellipse at 50% 80%, rgba(168,85,247,0.1) 0%, transparent 60%)',
        'card-glow': 'linear-gradient(135deg, rgba(108,99,255,0.05) 0%, rgba(0,212,255,0.03) 100%)',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(108,99,255,0.4), 0 0 60px rgba(108,99,255,0.1)',
        'neon-cyan': '0 0 20px rgba(0,212,255,0.4), 0 0 60px rgba(0,212,255,0.1)',
        'neon-sm': '0 0 10px rgba(108,99,255,0.3)',
        'glass': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        'card': '0 4px 24px rgba(0,0,0,0.3)',
      },
      animation: {
        'aurora': 'aurora 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'gradient': 'gradient 6s ease infinite',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(20px, -20px) scale(1.05)' },
          '66%': { transform: 'translate(-15px, 15px) scale(0.95)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(108,99,255,0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(108,99,255,0.8), 0 0 80px rgba(108,99,255,0.3)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
