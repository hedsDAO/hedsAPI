module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json", "./tsconfig.dev.json", "./test/**/*.ts"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
    "**/*.config.js",
    "**/*custom-transformer.js",
  ],
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  rules: {
    "max-len": 0,
    "new-cap": 0,
    "quotes": ["error", "double"],
    "import/no-unresolved": 0,
  },
};
