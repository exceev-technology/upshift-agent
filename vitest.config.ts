import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// No credential in the repository: integration tests read the test workspace's API key from
// UPSHIFT_API_KEY. The SDK client and CLI expect their own variable names, mapped here once.
const UPSHIFT_API_URL = process.env.UPSHIFT_API_URL ?? 'http://localhost:2020';
const UPSHIFT_API_KEY = process.env.UPSHIFT_API_KEY;

const env: Record<string, string> = {
  UPSHIFT_API_URL,
  TWENTY_API_URL: UPSHIFT_API_URL,
  ...(UPSHIFT_API_KEY ? { UPSHIFT_API_KEY, TWENTY_API_KEY: UPSHIFT_API_KEY } : {}),
};

// Make the variables available to globalSetup and the CLI it spawns (test.env only applies to workers).
Object.assign(process.env, env);

export default defineConfig({
  plugins: [
    tsconfigPaths({
      projects: ['tsconfig.spec.json'],
      ignoreConfigErrors: true,
    }),
  ],
  test: {
    testTimeout: 120_000,
    hookTimeout: 120_000,
    fileParallelism: false,
    include: ['src/**/*.integration-test.ts'],
    globalSetup: ['src/__tests__/global-setup.ts'],
    env,
  },
});
