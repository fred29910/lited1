import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginLit from 'eslint-plugin-lit';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['dist/*'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
  },
  ...tseslint.configs.recommended,
  {
    plugins: {
      lit: pluginLit,
    },
    rules: {
      ...pluginLit.configs.recommended.rules,
    },
  },
  eslintConfigPrettier,
];
