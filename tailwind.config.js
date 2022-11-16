/* eslint-disable global-require */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{html,js,ts}', './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    extend: {},
  },
  experimental: {
    applyComplexClasses: true,
  },
  plugins: [
    require('tw-elements/dist/plugin'),
    plugin(({ addBase, theme }) => {
      addBase({
        h1: { fontSize: theme('fontSize.2xl') },
        h2: { fontSize: theme('fontSize.xl') },
        h3: { fontSize: theme('fontSize.lg') },
      });
    }),
  ],
};
