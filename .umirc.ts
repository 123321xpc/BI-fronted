import { defineConfig } from '@umijs/max';
import * as path from 'node:path';
import { routes } from './config/routes';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: routes,
  npmClient: 'pnpm',
  alias: {
    '@': path.resolve(__dirname, 'src'),
    src: path.resolve(__dirname, 'src'),
  },
});
