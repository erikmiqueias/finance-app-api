import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    {
        rules: {
            'no-unused-vars': 'error',
            'no-undef': 'off',
            'no-unused-expressions': 'off',
            'no-constant-condition': 'off',
            'no-prototype-builtins': 'off',
            'no-unsafe-optional-chaining': 'off',
            'no-unsafe-negation': 'off',
            'no-unsafe-assignment': 'off',
            'no-unsafe-member-access': 'off',
            'no-unsafe-call': 'off',
            'no-unsafe-return': 'off',
            'no-unsafe-regex': 'off',
            'no-unsafe-finally': 'off',
            'no-unsafe-arithmetics': 'off',
            'no-unsafe-iteration': 'off',
            'no-unsafe-argument': 'off',
            'no-unsafe-indexing': 'off',
        },
    },
];
