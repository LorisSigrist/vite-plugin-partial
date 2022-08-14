import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    test: {
      environment: 'node',
      globals: true,
      setupFiles: ['./setupTests.ts'],
    },
  };
});
