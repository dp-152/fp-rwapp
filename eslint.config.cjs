const globals = require("globals");
const google = require("eslint-config-google");
const eslint = require("@eslint/js");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const jestPlugin = require("eslint-plugin-jest");
const importPlugin = require("eslint-plugin-import");
const promisePlugin = require("eslint-plugin-promise");

const opts = [
  {
    ignores: [
      "node_modules/**",
      "**/dist/**",
      ".yarn/**",
    ],
  },
  /** LANG OPTIONS **/
  {
    files: ["**/*.js", "**/*.ts", "**/*.cjs", "**/*.mjs"],
    languageOptions: {
      globals: {
        ...globals.es2024,
        ...globals.node,
        ...jestPlugin.environments.globals.globals,
      },
    },
  },
  /** PLUGINS **/
  {
    files: ["**/*.js", "**/*.ts", "**/*.cjs", "**/*.mjs"],
    plugins: {
      import: importPlugin,
      promise: promisePlugin,
    },
    settings: {
      "import/resolver": {
        typescript: true,
      },
    },
  },
  {
    files: [
      "**/*.test.js",
      "**/*.spec.js",
      "**/*.test.cjs",
      "**/*.spec.cjs",
      "**/*.test.mjs",
      "**/*.spec.mjs",
      "**/*.test.ts",
      "**/*.spec.ts",
    ],
    plugins: {
      jest: jestPlugin,
    },
  },
  {
    files: ["**/*.ts"],
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
  },
  /** RULES **/
  {
    files: ["**/*.js", "**/*.ts", "**/*.cjs", "**/*.mjs"],
    rules: {
      ...eslint.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...google.rules,
      ...promisePlugin.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.ts"],
    rules: importPlugin.configs.typescript.rules,
    settings: importPlugin.configs.typescript.settings,
  },
  {
    files: ["**/*.ts"],
    rules: tsPlugin.configs["eslint-recommended"].overrides[0].rules,
  },
  {
    files: ["**/*.ts"],
    rules: tsPlugin.configs.recommended.rules,
  },
  {
    files: [
      "**/*.test.js",
      "**/*.spec.js",
      "**/*.test.cjs",
      "**/*.spec.cjs",
      "**/*.test.mjs",
      "**/*.spec.mjs",
      "**/*.test.ts",
      "**/*.spec.ts",
    ],
    rules: jestPlugin.configs.recommended.rules,
  },
  {
    files: [
      "**/*.test.js",
      "**/*.spec.js",
      "**/*.test.cjs",
      "**/*.spec.cjs",
      "**/*.test.mjs",
      "**/*.spec.mjs",
      "**/*.test.ts",
      "**/*.spec.ts",
    ],
    rules: jestPlugin.configs.style.rules,
  },
  {
    files: ["**/*.js", "**/*.ts", "**/*.cjs", "**/*.mjs", "**/*.mts", "**/*.cts"],
    rules: {
      "no-extra-boolean-cast": "off",
      "arrow-parens": ["error", "always"],
      "operator-linebreak": ["error", "after", { overrides: { "?": "before", ":": "before" } }],
      eqeqeq: ["error", "smart"],
      "object-curly-spacing": ["error", "always"],
      quotes: ["warn", "double", { avoidEscape: true }],
      "comma-dangle": ["error", "always-multiline"],
      "quote-props": ["error", "as-needed"],
      "space-before-function-paren": [
        "error",
        {
          asyncArrow: "always",
          anonymous: "always",
          named: "never",
        },
      ],
      indent: [
        "error",
        2,
        {
          CallExpression: {
            arguments: 1,
          },
          FunctionDeclaration: {
            body: 1,
            parameters: 1,
          },
          FunctionExpression: {
            body: 1,
            parameters: 1,
          },
          MemberExpression: 1,
          ObjectExpression: 1,
          SwitchCase: 1,
          ignoredNodes: [
            "ConditionalExpression",
            "FunctionExpression > .params[decorators.length > 0]",
            "FunctionExpression > .params > :matches(Decorator, :not(:first-child))",
            "ClassBody.body > PropertyDefinition[decorators.length > 0] > .key",
          ],
        },
      ],
      "import/no-unresolved": "off",
      "require-jsdoc": 0,
      "valid-jsdoc": 0,
      "max-len": [
        "error",
        {
          code: 120,
          tabWidth: 2,
          ignoreUrls: true,
          ignoreComments: true,
          ignoreTrailingComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
      "promise/catch-or-return": ["error", { allowFinally: true }],
      "@typescript-eslint/no-inferrable-types": 0,
      "@typescript-eslint/no-non-null-assertion": 0,
    },
  },
  {
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

module.exports = opts;
