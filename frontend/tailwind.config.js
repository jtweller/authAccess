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
        medpurple: '#9370DB',
        thistle: '#D8BFD8',
        vrpurple: '#6A0DAD',
        silver: '#C0C0C0',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
