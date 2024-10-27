
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "node",
    "security",
    "nestjs",
    "prettier",
  ],
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:nestjs/recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  root: true,
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js", "global.d.ts", "prettier.config.js"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        experimentalTernaries: true,
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: false,
        singleQuote: true,
        quoteProps: "as-needed",
        jsxSingleQuote: false,
        trailingComma: "all",
        bracketSpacing: true,
        bracketSameLine: true,
        arrowParens: "always",
        parser: "typescript",
        requirePragma: false,
        insertPragma: false,
        proseWrap: "always",
        htmlWhitespaceSensitivity: "css",
        vueIndentScriptAndStyle: false,
        endOfLine: "lf",
        embeddedLanguageFormatting: "auto",
        singleAttributePerLine: false,
        requireConfig: true,
        fileInfoOptions: {
          withNodeModules: true,
          module: true,
        },
      },
    ],

    "no-console": "error",
    "no-debugger": "error",
    eqeqeq: "error",
    "no-unused-vars": "error",
    "nestjs/use-validation-pipe": "off",
    "no-duplicate-imports": "error",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/explicit-module-boundary-types": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-inferrable-types": "error",
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-empty-interface": "error",
    "@typescript-eslint/ban-ts-comment": "error",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/strict-boolean-expressions": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/member-ordering": "error",
    "@typescript-eslint/no-magic-numbers": "error",
    "@typescript-eslint/no-this-alias": "error",
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/class-literal-property-style": "error",
    "@typescript-eslint/consistent-generic-constructors": "error",
    "@typescript-eslint/consistent-indexed-object-style": "error",
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/explicit-member-accessibility": "error",
    "@typescript-eslint/method-signature-style": "error",
    "@typescript-eslint/no-confusing-non-null-assertion": "error",
    "@typescript-eslint/no-duplicate-enum-values": "error",
    "@typescript-eslint/no-duplicate-type-constituents": "error",
    "@typescript-eslint/no-extra-non-null-assertion": "error",
    "@typescript-eslint/no-for-in-array": "error",
    "@typescript-eslint/no-import-type-side-effects": "error",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
    "@typescript-eslint/no-unnecessary-condition": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "off",
    "@typescript-eslint/no-unsafe-member-access": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/prefer-reduce-type-parameter": "error",
    "@typescript-eslint/prefer-string-starts-ends-with": "error",
    "@typescript-eslint/restrict-template-expressions": "error",
    "@typescript-eslint/prefer-readonly": "error",
    "@typescript-eslint/return-await": "error",
    "@typescript-eslint/unified-signatures": "off",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "default",
        format: ["camelCase"],
      },
      {
        selector: "variable",
        format: ["camelCase", "UPPER_CASE", "PascalCase"],
        leadingUnderscore: "allow",
      },
      {
        selector: "parameter",
        format: ["camelCase"],
        leadingUnderscore: "allow",
      },
      {
        selector: "memberLike",
        modifiers: ["private"],
        format: ["camelCase", "UPPER_CASE", "snake_case"],
        leadingUnderscore: "allow",
      },
      {
        selector: "memberLike",
        modifiers: ["public"],
        format: ["camelCase", "UPPER_CASE", "snake_case", "PascalCase"],
      },
      {
        selector: "typeLike",
        format: ["PascalCase"],
      },
      {
        selector: "enumMember",
        format: ["UPPER_CASE"],
      },
      {
        selector: "objectLiteralMethod",
        format: ["camelCase", "PascalCase"],
      },
      {
        selector: "objectLiteralProperty",
        format: ["camelCase", "UPPER_CASE", "PascalCase", "snake_case"],
      },
    ],
    quotes: ["error", "single"],
    curly: ["error", "all"],
    "max-len": ["error", { code: 120 }],
    "no-implicit-coercion": "error",
    "node/no-missing-require": "error",
    "node/no-unpublished-require": "error",
    "node/exports-style": ["error", "module.exports"],
    "node/no-deprecated-api": "warn",
    "security/detect-non-literal-fs-filename": "warn",
    "security/detect-eval-with-expression": "error",
    "security/detect-new-buffer": "error",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
}
