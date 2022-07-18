const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
        fontFamily: {
            sans: ["Inter", ...defaultTheme.fontFamily.sans],
        },
        fontSize: {
            "numbers": "var(--proto-numbers)", 
            "h1": "var(--proto-h1)", 
            "h2": "var(--proto-h2)", 
            "p": "var(--proto-p)", 
            "info": "var(--proto-info)", 
            "description": "var(--proto-description)",
        },
        colors: {
            "dpbm-blue": "var(--dpbm-blue)",
            "dpbm-blue-light": "var(--dpbm-blue-light)",
            "dpbm-blue-dark": "var(--dpbm-blue-dark)",
            "dpbm-yellow": "var(--dpbm-yellow)",
            "proto-lightgrey": "var(--proto-lightgrey)",
            "proto-grey": "var(--proto-grey)",
            "proto-darkgrey": "var(--proto-darkgrey)",
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
