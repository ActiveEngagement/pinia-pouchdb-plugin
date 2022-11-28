module.exports = {
    root: true,
    env: {
        node: true
    },
    parser: '@typescript-eslint/parser',
    rules: {
        'quotes': [2, 'single', { 'avoidEscape': true }],
        'keyword-spacing': ['error', {
            'before': true,
            'after': true,
            'overrides': {
                'if': { 'after': false },
                'while': { 'after': false },
                'for': { 'after': false },
            }
        }],
        'indent': ['error', 4],
        'semi': [2, 'always'],
        'object-curly-spacing': ['error', 'always'],
        'space-before-blocks': ['error', 'always']
    }
};
