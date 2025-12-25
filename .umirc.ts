import { defineConfig } from '@umijs/max';
import * as path from 'node:path';
import { routes } from './config/routes';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  esmi: false,
  layout: {
    title: '@umijs/max',
  },
  routes: routes,
  npmClient: 'pnpm',
  alias: {
    '@': path.resolve(__dirname, 'src'),
    src: path.resolve(__dirname, 'src'),
  },
  tailwindcss: {},
  proxy: {
    '/api': {
      target: 'http://localhost:8101',
      changeOrigin: true,
    },
  },
});
