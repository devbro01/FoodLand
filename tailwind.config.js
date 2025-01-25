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
          DEFAULT: '#000000', 
        },
        secondary: {
          DEFAULT: '#FFFFFF', 
        },
        dark: {
          DEFAULT: '#000000',
        },
        gray: {
          DEFAULT: '#989898', 
        },
        accent: {
          DEFAULT: '#FFC164', 
        },
        light: {
          DEFAULT: '#FFFFFF', 
        },
      },
    },
  },
  plugins: [],
} 