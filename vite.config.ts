import react from '@vitejs/plugin-react';
import ssr from 'vite-plugin-ssr/plugin';
import { UserConfig } from 'vite';
import path from 'path';

const config: UserConfig = {
  plugins: [react(), ssr()],
  server: {
    cors: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
};

export default config;
