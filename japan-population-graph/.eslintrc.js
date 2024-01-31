module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended",
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
    },
    "plugins": ["react", '@typescript-eslint'],
    "rules": {
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
    },
    ignorePatterns: [
        'build/',
        'public/,',
        '**/node_modules/',
        '*.config.js',
        '.*lintrc.js',
        '/*.*'
    ],
}
