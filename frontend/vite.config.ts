import react from '@vitejs/plugin-react';
import { defineConfig, lazyPlugins } from 'vite-plus';

// https://vitejs.dev/config/
export default defineConfig({
  lint: {
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
    options: { typeAware: true, typeCheck: true },
  },
  fmt: {
    sortImports: true,
    singleQuote: true,
    jsxSingleQuote: true,
    ignorePatterns: [],
  },
  staged: {
    '*': 'vp check --fix',
  },
  plugins: lazyPlugins(() => [react()]),
});
