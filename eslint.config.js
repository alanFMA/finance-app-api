import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

export default [
    js.configs.recommended,
    prettier, // <- Adiciona a configuração do Prettier
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                console: 'readonly', // Define console como global
            },
        },
        rules: {
            'no-unused-vars': 'error',
            'no-console': 'off',
            'no-undef': 'off',
            eqeqeq: 'error',
        },
    },
];
