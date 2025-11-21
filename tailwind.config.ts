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
        primary: {
          DEFAULT: '#0066CC',
          50: '#E6F2FF',
          100: '#CCE5FF',
          500: '#0066CC',
          600: '#0052A3',
          700: '#003D7A',
        },
        secondary: {
          DEFAULT: '#00A86B',
          500: '#00A86B',
          600: '#008756',
        },
        accent: {
          DEFAULT: '#6366F1',
          500: '#6366F1',
        },
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        info: '#3B82F6',
      },
    },
  },
  plugins: [],
}
export default config
