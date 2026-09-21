import path from 'node:path';
import js from '@eslint/js';
import ts from 'typescript-eslint';
import globals from 'globals';
import css from '@eslint/css';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores, includeIgnoreFile } from 'eslint/config';
import { type SvelteConfig } from '@sveltejs/vite-plugin-svelte';
// @ts-expect-error no types for js config
import svelteConfig from './svelte.config';

const gitignorePath = path.resolve(import.meta.dirname, '../.gitignore');

export default defineConfig(
  includeIgnoreFile(gitignorePath),
  globalIgnores(['dist/', 'wailsjs/', 'package-lock.json']),
  // JavaScript & TypeScript
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}', '**/*.svelte'],
    extends: [js.configs.recommended, ts.configs.recommended],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      // typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
      // see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
      'no-undef': 'off',
    },
  },

  // Svelte
  {
    files: ['**/*.svelte'],
    extends: [svelte.configs.recommended, svelte.configs.prettier],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.svelte'],
        parser: ts.parser,
        svelteConfig: svelteConfig as SvelteConfig,
      },
    },
  },

  // Prettier
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,css}', '**/*.svelte'],
    extends: [prettier],
  },

  // CSS
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
  }
);
