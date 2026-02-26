import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        surface: {
          DEFAULT: '#0F0F12',
          1: '#16161C',
          2: '#1C1C24',
          3: '#22222C',
          4: '#2A2A36',
        },
        accent: {
          DEFAULT: '#7C6AF7',
          dim: '#5B52C4',
          glow: '#A99BFF',
        },
        success: { DEFAULT: '#22C55E', dim: '#16A34A' },
        danger:  { DEFAULT: '#EF4444', dim: '#DC2626' },
        warning: { DEFAULT: '#F59E0B', dim: '#D97706' },
        muted: '#6B7280',
        border: '#2A2A36',
      },
      boxShadow: {
        neo:         '4px 4px 0px 0px rgba(124,106,247,0.8)',
        'neo-sm':    '2px 2px 0px 0px rgba(124,106,247,0.6)',
        'neo-danger':'4px 4px 0px 0px rgba(239,68,68,0.8)',
        card:        '0 4px 24px 0 rgba(0,0,0,0.4)',
        glow:        '0 0 20px rgba(124,106,247,0.3)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-in':  'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' },                                         '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(12px)' },          '100%': { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.95)' },               '100%': { opacity: '1', transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
} satisfies Config;