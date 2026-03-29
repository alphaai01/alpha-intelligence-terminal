import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#0d1b2a',
        'secondary-dark': '#1b2838',
        'card': '#0f2440',
        'accent-teal': '#1b9aaa',
        'accent-gold': '#d4a843',
        'success': '#10b981',
        'danger': '#ef4444',
      },
      backgroundColor: {
        'primary-dark': '#0d1b2a',
        'secondary-dark': '#1b2838',
        'card': '#0f2440',
      },
      textColor: {
        'accent-teal': '#1b9aaa',
        'accent-gold': '#d4a843',
        'success': '#10b981',
        'danger': '#ef4444',
      },
      borderColor: {
        'accent-teal': '#1b9aaa',
        'accent-gold': '#d4a843',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-right': 'slideRight 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropFilter: {
        'glass': 'blur(10px) brightness(1.1)',
      },
      backgroundImage: {
        'gradient-text': 'linear-gradient(90deg, #1b9aaa, #d4a843)',
        'glow-teal': 'radial-gradient(circle, rgba(27, 154, 170, 0.2) 0%, rgba(27, 154, 170, 0) 70%)',
        'glow-gold': 'radial-gradient(circle, rgba(212, 168, 67, 0.2) 0%, rgba(212, 168, 67, 0) 70%)',
      },
      boxShadow: {
        'glow-teal': '0 0 20px rgba(27, 154, 170, 0.3)',
        'glow-gold': '0 0 20px rgba(212, 168, 67, 0.3)',
        'glow-success': '0 0 20px rgba(16, 185, 129, 0.3)',
        'glow-danger': '0 0 20px rgba(239, 68, 68, 0.3)',
        'inner-glow': 'inset 0 0 20px rgba(27, 154, 170, 0.1)',
      },
    },
  },
  plugins: [],
}

export default config
