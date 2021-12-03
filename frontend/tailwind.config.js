const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "dpbm-blue": "var(--dpbm-blue)",
        "dpbm-blue-light": "var(--dpbm-blue-light)",
        "dpbm-blue-dark": "var(--dpbm-blue-dark)",
        "dpbm-yellow": "var(--dpbm-yellow)"
      },
      zIndex: {
        '-10': '-10',
      }
    },
  },
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
};
