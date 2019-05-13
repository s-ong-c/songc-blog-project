const path = require('path');

module.exports = {
  "extends": [
    "react-app",
    "airbnb"
  ],
  "settings": {
    "import/resolver": {
      node: { paths: [path.resolve('./src')] }
    },
  },
  "rules": {
    "class-methods-use-this": 0,
    "react/jsx-filename-extension": 0,
    "jsx-a11y/href-no-hash": 0,
    "no-unused-vars": 1,
    "no-trailing-spaces":0,
    "arrow-body-style": 0,
    "import/prefer-default-export": 1,
    "react/prop-types": 0,
    "object-curly-spacing":0,
    "react/jsx-tag-spacing":0,
    "react/self-closing-comp": 1,
    "lines-between-class-members":0,
    "react/jsx-indent":0,
    "react/jsx-indent-props":0,
    "indent":0,
    "no-multi-spaces":0,
    "import/newline-after-import":0,
    "eol-last":0,
    "react/jsx-equals-spacin":0,
    "react/jsx-equals-spacing":0,
    "comma-spacing": 0,
    "react/jsx-closing-tag-location":0,
    "react/require-default-props": 0,
    "react/jsx-one-expression-per-line":0,
    "react/prefer-stateless-function": 0,
    "no-underscore-dangle":0,
    "react/default-props-match-prop-types": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "import/no-useless-path-segments":0,
    "react/sort-comp":0,
    "object-curly-newline":0,
    "react/no-unused-prop-types":0,
    "react/destructuring-assignment":0,
    "max-len":0,
    "jsx-a11y/no-autofocus":0,
    "global-require":0,
  }
}