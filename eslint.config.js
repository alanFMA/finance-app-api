import js from '@eslint/js'

export default [
    js.configs.recommended,
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
]
