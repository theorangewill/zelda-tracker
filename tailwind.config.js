/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2d7a3e',
          dark: '#1f5429',
          light: '#4a9d5f',
        },
        accent: {
          DEFAULT: '#ffd700',
          dark: '#ccac00',
        },
        danger: '#e74c3c',
        success: '#27ae60',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
