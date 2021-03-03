const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: "Inter UI",
    },
    extend: {
      container: {
        center: true,
        padding: "2rem",
      },
      colors: {
        gray: colors.blueGray,
      },
    },
  },
  variants: {
    extend: {
      margin: ["first", "last"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
