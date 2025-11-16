/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',  // Custom breakpoint for larger phones
      },
      colors: {
        primary: {
          DEFAULT: '#EAB308', // Golden
          50: '#FEF9E7',
          100: '#FDF3D1',
          200: '#FCE79F',
          300: '#FADB6D',
          400: '#F9CF3B',
          500: '#EAB308', // Main golden
          600: '#CA9A04',
          700: '#A17C03',
          800: '#785E02',
          900: '#4F3F01',
        },
        amber: {
          DEFAULT: '#F59E0B',
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
          950: '#451A03',
        },
        apillon: {
          purple: '#8B5CF6',
          blue: '#3B82F6',
          green: '#10B981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['DM Mono', 'Courier New', 'monospace'],
        theatrical: ['Cinzel Decorative', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'apillon-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
        'golden-gradient': 'linear-gradient(135deg, #EAB308 0%, #F59E0B 100%)',
        'restaurant-texture': 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(234, 179, 8, 0.03) 2px, rgba(234, 179, 8, 0.03) 4px), repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(234, 179, 8, 0.03) 2px, rgba(234, 179, 8, 0.03) 4px)',
      },
      boxShadow: {
        'golden': '0 10px 40px rgba(234, 179, 8, 0.3)',
        'golden-lg': '0 20px 60px rgba(234, 179, 8, 0.4)',
        'theatrical': 'inset 0 0 20px rgba(234, 179, 8, 0.1), 0 0 30px rgba(234, 179, 8, 0.2)',
      },
    },
  },
  plugins: [],
};
