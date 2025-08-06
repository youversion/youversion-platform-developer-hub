import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        searchPulse: {
          '0%, 100%': { 
            transform: 'scale(1)',
            opacity: '0.5'
          },
          '50%': { 
            transform: 'scale(1.05)',
            opacity: '0.7'
          }
        },
        searchIconPulse: {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '0.6'
          },
          '50%': {
            transform: 'scale(1.1)',
            opacity: '1'
          }
        }
      },
      animation: {
        shimmer: 'shimmer 2.5s ease-in-out infinite',
        searchPulse: 'searchPulse 2s ease-in-out infinite',
        searchIconPulse: 'searchIconPulse 1s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}

export default config 