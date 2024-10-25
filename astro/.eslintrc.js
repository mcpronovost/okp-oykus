module.exports = {
  env: {
    browser: true,
    es2021: true,
    jquery: true,
  },
  extends: "standard",
  ignorePatterns: ["MainLayout.astro"],
  overrides: [
    {
      // Define the configuration for `.astro` file and enable it.
      files: ["*.astro", "*.vue"],
      plugins: ["astro", "vue"],
      env: {
        // Enables global variables available in Astro components.
        node: true,
        "astro/astro": true,
        "vue/vue": true,
        es2020: true,
      },
      // Allows Astro components to be parsed.
      parser: "astro-eslint-parser",
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      // parserOptions: {
      //  parser: "@typescript-eslint/parser",
      //  extraFileExtensions: [".astro"],
        // The script of Astro components uses ESM.
      //  sourceType: "module",
      // },
      rules: {
        // Enable recommended rules
        "astro/no-conflict-set-directives": "error",
        "astro/no-unused-define-vars-in-style": "error",
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      },
    },
    {
      // Define the configuration for `<script>` tag.
      // Script in `<script>` is assigned a virtual file name with the `.js` extension.
      files: ["**/*.astro/*.js", "*.astro/*.js"],
      env: {
        browser: true,
        es2020: true,
      },
    },
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
      4,
      { SwitchCase: 1, ignoredNodes: ["ConditionalExpression"] },
    ],
    "no-tabs": 0,
    semi: [2, "always"],
    quotes: [2, "double", { avoidEscape: true }],
    "comma-dangle": [2, "always-multiline"],
  },
};
