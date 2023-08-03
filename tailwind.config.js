/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      moderateBlue: '#323352',
      darkBlue: '#465A72',
      lightGrayBlue: '#C3C4EF',
      grayishBlue: '#67727E',
      lightGray: '#EAECF1',
      veryLightGray: '#F5F6FA',
      softRed: '#ED6468',
      paleRed: '#FFB8BB',
      white: '#000000'
    }
  },
  plugins: [],
}