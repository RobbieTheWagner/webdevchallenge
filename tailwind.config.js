/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{gjs,gts,hbs,html,js,ts}'],
  theme: {
    extend: {
      colors: {
        gold: '#857552',
      },
      fontFamily: {
        body: ['Barlow', 'sans-serif'],
        heading: ['Cinzel', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
