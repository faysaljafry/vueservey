module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@themesberg/flowbite/plugin')],
};
