import jsdoc from 'eslint-plugin-jsdoc';

export default [
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      jsdoc,
    },
    rules: {
      // Use the recommended typescript config as a baseline
      ...jsdoc.configs["flat/recommended-typescript"].rules,

      // Enforce JSDoc comments on functions
      "jsdoc/require-jsdoc": [
        "error",
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: true,
            FunctionExpression: true,
          },
          // Optional: skip checking private methods or specific patterns if needed
          publicOnly: false,
        },
      ],
    },
  },
];