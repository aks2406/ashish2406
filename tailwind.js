module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'blue-lighter': '#1E213A',
        'blue-dark': '#100E1D',
        'light-gray': '#6E707A',
        'progress-bar': '#FFEC65',
      },
      backgroundImage: {
        'cloud-image': "url('/src/cloud-bg.png')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
