module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:astro/recommended"
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": "error",
    "space-before-function-paren": "off",
    indent: [
      "error",
      2,
      { SwitchCase: 1, ignoredNodes: ["ConditionalExpression"] },
    ],
    "no-tabs": 0,
    semi: [2, "always"],
    quotes: [2, "double", { avoidEscape: true }],
    "comma-dangle": [2, "always-multiline"],
  },
};