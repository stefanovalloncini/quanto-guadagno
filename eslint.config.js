import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";
import i18next from "eslint-plugin-i18next";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  { ignores: ["dist", "coverage", "node_modules", ".claude"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.strict, prettier],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "jsx-a11y": jsxA11y,
      i18next,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.strict.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "i18next/no-literal-string": [
        "error",
        { markupOnly: true, ignoreAttribute: ["data-testid", "aria-hidden"] },
      ],
      "max-lines": ["error", { max: 250, skipBlankLines: true, skipComments: true }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "JSXAttribute[name.name='className'] Literal[value=/\\b(bg-gradient-|shadow-xl|shadow-2xl)\\b/]",
          message: "Decorative gradients and shadow-xl/2xl are banned. Use design tokens.",
        },
        {
          selector: "JSXAttribute[name.name='className'] Literal[value=/#[0-9a-fA-F]{3,8}/]",
          message: "No hardcoded hex colors in className. Use tokens.",
        },
      ],
    },
  },
  {
    files: ["src/domain/**/*.ts", "src/ports/**/*.ts"],
    rules: {
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["react", "react/*", "react-*"],
              message: "domain and ports must stay React-free.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/ui/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/adapters/*", "../../adapters/*", "../adapters/*"],
              message: "UI imports adapters only via app/container.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.test.{ts,tsx}", "tests/**/*.{ts,tsx}", "vitest.setup.ts"],
    rules: {
      "i18next/no-literal-string": "off",
      "max-lines": "off",
    },
  },
  {
    files: ["scripts/**/*.ts", "vite.config.ts"],
    rules: {
      "i18next/no-literal-string": "off",
    },
  },
  {
    files: ["src/ui/i18n/messages/**/*.ts", "src/domain/data/**/*.ts"],
    rules: {
      "max-lines": "off",
      "i18next/no-literal-string": "off",
    },
  },
);
