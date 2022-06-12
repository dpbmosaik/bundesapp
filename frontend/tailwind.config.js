const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,ts}'],
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
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    plugin(function ({ addVariant, e, postcss }) {
      addVariant('firefox', ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: '-moz-document',
          params: 'url-prefix()',
        })
        isFirefoxRule.append(container.nodes)
        container.append(isFirefoxRule)
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(`firefox${separator}${rule.selector.slice(1)}`)}`
        })
      })
    }),
  ],
}
