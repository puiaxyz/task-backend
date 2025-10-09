import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    // Override rules here for specific files or globally
    rules: {
      // Disable the no-explicit-any rule
      '@typescript-eslint/no-explicit-any': 'off',
      // Disable the no-useless-catch rule
      'no-useless-catch': 'off',
    },
  },
);