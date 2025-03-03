export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // General rules
      'no-console': 'warn',
      'eqeqeq': ['error', 'always'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'indent': ['error', 2],
      'comma-dangle': ['error', 'always-multiline'],
      
      // Simple TypeScript-like rules without requiring the plugin
      'no-unused-vars': 'error',
      'no-undef': 'off', // Turn off as TypeScript handles this
    },
    
  },
];