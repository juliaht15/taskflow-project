export default tseslint.config(
  { ignores: ['dist', 'node_modules', '.vercel'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest', // Cambiamos 2020 por 'latest'
      globals: {
        ...globals.browser,
        ...globals.es2021, // Añadimos globales modernos
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      // Sugerencia extra: evita que te olvides de las dependencias en los arrays de los Hooks
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
)