/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: '#144273',
      secondary: '#092646',
    },
    aspectRatio:{
      'card': `13/9`,
      'video': `16/7`,
    }
  },
  plugins: [],
}

