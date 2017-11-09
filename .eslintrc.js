// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "no-useless-concat": "error",
    "require-jsdoc": "error",
    "require-await": "error",
    "arrow-spacing":"error",
    "prefer-rest-params":"error",
    "arrow-parens": [
      "error",
      "as-needed"
    ],
    "arrow-body-style": [
      "error",
      "as-needed"
    ],
    "indent": [
      "error",
      2
    ],
    "no-var": "error",
    "prefer-const": "error",
    "prefer-arrow-callback": "error",
    "consistent-return": "error",
    "eqeqeq": "error",
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "object-shorthand": [
      "error",
      "always"
    ]
  }
}
