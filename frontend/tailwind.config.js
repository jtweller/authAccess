module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gunmetal: '#2C3539',
        lightgrey: '#D3D3D3',
        brightwhite: '#FFFFFF',
        tan: '#D2B48C',
        lighttan: '#F5F5DC',
        darktan: '#BC8F8F',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
