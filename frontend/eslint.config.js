import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import importPlugin from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
    { ignores: ["dist", ".vite", "**/*.d.ts"] },
    {
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            ...eslintPluginAstro.configs.recommended,
            ...importPlugin.configs.recommended,
        ],
        files: ["**/*.{ts,tsx,astro,js,jsx}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
            globals: {
                browser: true,
                es2024: true,
                node: true,
            },
        },
        plugins: {
            "import-plugin": importPlugin,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        rules: {
            /* React */
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
            /* Astro */
            "astro/no-conflict-set-directives": "error",
            "astro/no-unused-define-vars-in-style": "error",
            /* Import */
            "import/order": ["error", {
                "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
                "newlines-between": "always",
                "alphabetize": { "order": "asc" }
            }],
            "import/no-unresolved": "error",
            "import/no-cycle": "error",
            "import/no-unused-modules": "error",
            /* General */
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-implicit-any": "off",
            "no-console": "error",
            "space-before-function-paren": [
                "error",
                {
                    anonymous: "always",
                    named: "never",
                    asyncArrow: "always",
                },
            ],
            indent: ["error", 4, { SwitchCase: 1, ignoredNodes: ["ConditionalExpression"] }],
            "no-tabs": 0,
            semi: [2, "always"],
            quotes: [2, "double", { avoidEscape: true }],
            "comma-dangle": [2, "always-multiline"],
        },
    },
);
