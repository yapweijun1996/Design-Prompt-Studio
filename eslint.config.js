// ESLint v9 flat config
// Keeps the bar low for v0.4 — no formatting rules, focus on real bugs.
import globals from "globals";

export default [
  {
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { impliedStrict: true },
      },
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: "warn",
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "no-undef": "error",
      "no-const-assign": "error",
      "no-dupe-keys": "error",
      "no-duplicate-imports": "error",
      "no-implicit-globals": "error",
      "no-self-compare": "error",
      "no-unreachable": "error",
      "prefer-const": "warn",
      eqeqeq: ["warn", "smart"],
    },
  },
  {
    ignores: ["dist/**", "node_modules/**", "public/**"],
  },
];
