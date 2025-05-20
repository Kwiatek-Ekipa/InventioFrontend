import { defineConfig, globalIgnores } from 'eslint/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores(['projects/**/*']),
  {
    files: ['**/*.ts'],

    plugins: {
      '@stylistic/ts': stylisticTs,
    },

    extends: compat.extends(
      'plugin:@angular-eslint/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended'
    ),

    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: ['tsconfig.json'],
        createDefaultProgram: true,
      },
    },

    settings: {},

    rules: {
      'prettier/prettier': 'warn',
      '@stylistic/ts/indent': ['warn', 2],
      '@stylistic/ts/padding-line-between-statements': [
        'warn',
        {
          blankLine: 'always',
          prev: '*',
          next: 'return',
        },
        {
          blankLine: 'always',
          prev: 'let',
          next: '*',
        },
        {
          blankLine: 'always',
          prev: 'const',
          next: '*',
        },
        {
          blankLine: 'any',
          prev: 'const',
          next: 'let',
        },
        {
          blankLine: 'any',
          prev: 'let',
          next: 'const',
        },
        {
          blankLine: 'any',
          prev: 'const',
          next: 'const',
        },
        {
          blankLine: 'any',
          prev: 'let',
          next: 'let',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/class-literal-property-style': 'error',
      '@typescript-eslint/consistent-generic-constructors': ['error', 'constructor'],
      'consistent-return': 'off',
      '@typescript-eslint/consistent-return': 'error',
      'default-param-last': 'off',
      '@typescript-eslint/default-param-last': 'error',
      'dot-notation': 'off',
      '@typescript-eslint/dot-notation': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-member-accessibility': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/method-signature-style': ['error', 'method'],
      '@typescript-eslint/no-deprecated': 'error',
      '@typescript-eslint/no-extra-non-null-assertion': 'error',
      '@typescript-eslint/no-invalid-void-type': 'error',
      'no-magic-numbers': 'off',
      '@typescript-eslint/no-magic-numbers': ['warn', { ignore: [-1, 0, 1, 2, 3] }],
      '@typescript-eslint/no-mixed-enums': 'warn',
      '@typescript-eslint/no-this-alias': 'error',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': 'warn',
      'no-var': 'error',
      '@typescript-eslint/prefer-find': 'warn',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/prefer-reduce-type-parameter': 'warn',
      '@typescript-eslint/require-array-sort-compare': 'warn',

      'prefer-spread': 'warn',
      'prefer-rest-params': 'warn',
      'prefer-object-spread': 'warn',
      'prefer-const': 'warn',
      'prefer-arrow-callback': 'warn',
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'default',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: ['memberLike'],
          modifiers: ['private'],
          leadingUnderscore: 'require',
          format: ['camelCase'],
        },
        {
          selector: ['memberLike'],
          modifiers: ['protected'],
          format: ['camelCase'],
          prefix: ['$'],
        },
        {
          selector: ['class', 'typeLike', 'enum', 'interface'],
          format: ['PascalCase'],
        },
        {
          selector: ['enumMember'],
          format: ['UPPER_CASE'],
        },
        {
          selector: ['variable', 'property'],
          format: ['PascalCase'],
          types: ['boolean'],
          prefix: ['is', 'are', 'has', 'can', 'show', 'should', 'needs', 'must'],
        },
      ],

      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: [
            // Index signature
            'signature',
            'call-signature',

            // Fields
            'public-static-field',
            'protected-static-field',
            'private-static-field',
            '#private-static-field',

            'public-decorated-field',
            'protected-decorated-field',
            'private-decorated-field',

            'public-instance-field',
            'protected-instance-field',
            'private-instance-field',
            '#private-instance-field',

            'public-abstract-field',
            'protected-abstract-field',

            'public-field',
            'protected-field',
            'private-field',
            '#private-field',

            'static-field',
            'instance-field',
            'abstract-field',

            'decorated-field',

            'field',

            // Accessors
            'public-static-accessor',
            'protected-static-accessor',
            'private-static-accessor',
            '#private-static-accessor',

            'public-decorated-accessor',
            'protected-decorated-accessor',
            'private-decorated-accessor',

            'public-instance-accessor',
            'protected-instance-accessor',
            'private-instance-accessor',
            '#private-instance-accessor',

            'public-abstract-accessor',
            'protected-abstract-accessor',

            'public-accessor',
            'protected-accessor',
            'private-accessor',
            '#private-accessor',

            'static-accessor',
            'instance-accessor',
            'abstract-accessor',

            'decorated-accessor',

            'accessor',

            // Static initialization
            'static-initialization',

            // Constructors
            'public-constructor',
            'protected-constructor',
            'private-constructor',

            'constructor',

            // Methods
            'public-static-method',
            'protected-static-method',
            'private-static-method',
            '#private-static-method',

            'public-decorated-method',
            'protected-decorated-method',
            'private-decorated-method',

            'public-instance-method',
            'protected-instance-method',
            'private-instance-method',
            '#private-instance-method',

            'public-abstract-method',
            'protected-abstract-method',

            'public-method',
            'protected-method',
            'private-method',
            '#private-method',

            'static-method',
            'instance-method',
            'abstract-method',

            'decorated-method',

            'method',
          ],
        },
      ],
    },
  },
]);
