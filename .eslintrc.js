export default {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/recommended",
  ],
  plugins: ["@typescript-eslint", "react"],
  env: {
    browser: true,
    es2021: true,
    node: true,
    commonjs: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // TypeScript specific rules
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],

    // React rules
    "react/react-in-jsx-scope": "off", // Not needed in Next.js
    "react/prop-types": "off", // Not needed when using TypeScript

    // General rules
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "no-console": "warn",
  },
};
