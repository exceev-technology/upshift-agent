import { runUpshiftCli } from './run-upshift-cli';

function validateEnv(): { apiUrl: string; apiKey: string } {
  const apiUrl = process.env.UPSHIFT_API_URL;
  const apiKey = process.env.UPSHIFT_API_KEY;

  if (!apiUrl || !apiKey) {
    throw new Error(
      'UPSHIFT_API_KEY must be set to an API key of the test workspace; never commit it.\n' +
        'Start a local server with: yarn upshift docker:start',
    );
  }

  return { apiUrl, apiKey };
}

async function checkServer(apiUrl: string) {
  let response: Response;

  try {
    response = await fetch(`${apiUrl}/healthz`);
  } catch {
    throw new Error(
      `Upshift server is not reachable at ${apiUrl}. ` +
        'Make sure the server is running before executing integration tests.',
    );
  }

  if (!response.ok) {
    throw new Error(`Server at ${apiUrl} returned ${response.status}`);
  }
}

export async function setup() {
  const { apiUrl } = validateEnv();

  await checkServer(apiUrl);
  await runUpshiftCli(['app', 'uninstall', '--yes']);

  const result = await runUpshiftCli(['app', 'apply', '--create']);

  if (!result.ok) {
    throw new Error(
      `App apply failed: ${result.error.code} ${result.error.message}`,
    );
  }
}

export async function teardown() {
  const result = await runUpshiftCli(['app', 'uninstall', '--yes']);

  if (!result.ok) {
    console.warn(`App uninstall failed: ${result.error.message}`);
  }
}
