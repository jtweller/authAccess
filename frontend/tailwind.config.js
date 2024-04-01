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
        skyblue: '#87CEEB',
        steelblue: '#4682B4',
        powderblue: '#B0E0E6',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
