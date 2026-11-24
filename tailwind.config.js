/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      screens: {
        // Laptop screens too short for a section laid out to fit one desktop screen
        short: { raw: '(min-width: 1024px) and (max-height: 880px)' },
        tiny: { raw: '(min-width: 1024px) and (max-height: 740px)' },
      },
      colors: {
        // Light agency paper system — dark mode disabled site-wide
        bw: {
          black: '#151d1a',
          white: '#ffffff',
          text: {
            primary: '#151d1a',
            secondary: '#5c5650',
            tertiary: '#8a827a',
            inverted: '#f4efe8'
          },
          bg: {
            primary: '#f4efe8',
            secondary: '#fffbf6',
            tertiary: '#ebe4da',
            dark: '#e0d6c8'
          },
          border: {
            DEFAULT: 'rgba(21, 29, 26, 0.1)',
            dark: 'rgba(21, 29, 26, 0.22)'
          }
        },
        // Champagne / copper accent palette
        accent: {
          DEFAULT: '#b8734d',
          light: '#cda06f',
          dark: '#88482e',
          muted: '#e8d5c4',
          subtle: '#f3e6d8',
        },
      },
      fontFamily: {
        display: ['"Clash Display"', 'Manrope', 'sans-serif'],
        body: ['Satoshi', 'Inter', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-subtle': 'linear-gradient(to bottom, #fffbf6, #f4efe8)',
        'gradient-dark': 'linear-gradient(to bottom, #f4efe8, #ebe4da)',
      },
      boxShadow: {
        'none': 'none',
        'sm': '0 1px 2px rgba(21, 29, 26, 0.06)',
        'md': '0 4px 14px -3px rgba(21, 29, 26, 0.1), 0 2px 6px -2px rgba(21, 29, 26, 0.06)',
        'lg': '0 12px 32px -10px rgba(21, 29, 26, 0.12), 0 4px 12px -4px rgba(21, 29, 26, 0.06)',
        'xl': '0 20px 48px -14px rgba(21, 29, 26, 0.14), 0 8px 20px -8px rgba(21, 29, 26, 0.08)',
        '2xl': '0 32px 64px -18px rgba(21, 29, 26, 0.16)',
        'soft': '0 2px 8px rgba(21, 29, 26, 0.06)',
        'medium': '0 10px 34px -10px rgba(21, 29, 26, 0.12)',
        'hard': '4px 4px 0px 0px rgba(21, 29, 26, 0.12)',
        'card-hover': '0 28px 64px -24px rgba(21, 29, 26, 0.14), 0 0 60px -32px rgba(184, 115, 77, 0.2)',
        'glow-accent': '0 0 60px -15px rgba(184, 115, 77, 0.28)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'slide-left': 'slideLeft 0.6s ease-out',
        'slide-right': 'slideRight 0.6s ease-out',
        'page-load': 'pageLoad 1s cubic-bezier(0.16, 1, 0.3, 1) both',
        'marquee': 'marquee 45s linear infinite',
        'scroll-hint': 'scrollHint 1.8s cubic-bezier(0.76, 0, 0.24, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateZ(0)' },
          '50%': { transform: 'translateY(-20px) translateZ(0)' },
        },
        pulseGlow: {
          '0%, 100%': {
            filter: 'drop-shadow(0 0 20px rgba(184, 115, 77, 0.25))',
            transform: 'scale(1)'
          },
          '50%': {
            filter: 'drop-shadow(0 0 40px rgba(184, 115, 77, 0.4))',
            transform: 'scale(1.02)'
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pageLoad: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scrollHint: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '50%': { transform: 'translateY(6px)', opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'professional': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'wide': '0.05em',
        'wider': '0.1em',
      },
    },
  },
  plugins: [],
};
