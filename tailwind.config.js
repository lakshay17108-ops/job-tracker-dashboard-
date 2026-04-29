/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stone: {
          50: '#FAFAF9',
        },
        zinc: {
          900: '#18181B',
          600: '#52525B',
          200: '#E4E4E7',
        },
        indigo: {
          600: '#4F46E5',
          700: '#4338CA',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}