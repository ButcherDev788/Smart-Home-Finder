/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#121212',
          darker: '#181818',
        },
        accent: {
          blue: '#0ea5e9', // sky-500
          green: '#10b981', // emerald-500
          amber: '#f59e0b', // amber-500
        },
        card: {
          dark: 'rgba(255, 255, 255, 0.06)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}