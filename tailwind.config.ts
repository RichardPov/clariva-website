import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#FFCA66',
        'gold-dark': '#AB6F00',
        'gold-mid': '#BE8D2F',
        ink: '#0A0A0B',
        'ink-2': '#111114',
        cream: '#F7F5F0',
      },
      fontFamily: {
        syne: ['Satoshi', 'var(--font-dm-sans)', 'sans-serif'],
        dm: ['var(--font-dm-sans)', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2.5s ease-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '0.4' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
