module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      minHeight: {
        '128': '32rem',
        '96':'24rem',
        '80': '20rem',
      },
      height: {
        '128': '32rem',
      },
      colors: {
        'button-grey': '#EEEEEE',
        'plus-grey':'#EFEFEF',
      },
    },
  },
  plugins: [],
}