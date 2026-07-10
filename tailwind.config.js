/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#000000',
          900: '#0F172A',
          800: '#111827',
        },
        primary: '#38BDF8',
        accent: '#A855F7',
        highlight: '#FACC15',
        secondary: '#14B8A6',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        artistic: ['Caveat', 'cursive'],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(56, 189, 248, 0.45)',
        'glow-accent': '0 0 40px -8px rgba(168, 85, 247, 0.45)',
        'glow-gold': '0 0 40px -8px rgba(250, 204, 21, 0.4)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      animation: {
        'spin-slow': 'spin 18s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 7s ease-in-out infinite 1s',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        }
      }
    },
  },
  plugins: [],
}
