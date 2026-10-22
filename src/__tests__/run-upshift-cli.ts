import { spawn } from 'child_process';
import { delimiter, join } from 'path';

// Binary name installed by the SDK's CLI package; override it with UPSHIFT_CLI.
const DEFAULT_CLI_BINARY = 'twenty';

type UpshiftCliError = {
  code: string;
  message: string;
  hint?: string;
};

export type UpshiftCliResult =
  | { ok: true; data: unknown }
  | { ok: false; error: UpshiftCliError };

function withoutProjectBinaries(pathValue: string) {
  return pathValue
    .split(delimiter)
    .filter(
      (entry) =>
        entry !== process.env.BERRY_BIN_FOLDER &&
        !entry.endsWith(join('node_modules', '.bin')),
    )
    .join(delimiter);
}

export function runUpshiftCli(args: string[]): Promise<UpshiftCliResult> {
  const executable = process.env.UPSHIFT_CLI ?? DEFAULT_CLI_BINARY;

  return new Promise((resolve, reject) => {
    const child = spawn(executable, [...args, '--json'], {
      env: {
        ...process.env,
        PATH: withoutProjectBinaries(process.env.PATH ?? ''),
      },
      stdio: ['ignore', 'pipe', 'inherit'],
    });
    let stdout = '';

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (chunk: string) => {
      stdout += chunk;
    });

    child.on('error', (error: NodeJS.ErrnoException) => {
      reject(
        error.code === 'ENOENT'
          ? new Error(
              `${executable} was not found. Install the Upshift CLI globally (see the CI workflow), or set UPSHIFT_CLI to its path.`,
            )
          : error,
      );
    });

    child.on('close', (exitCode) => {
      try {
        resolve(JSON.parse(stdout));
      } catch {
        reject(
          new Error(
            `${executable} ${args.join(' ')} exited with code ${exitCode} without a JSON result. ` +
              'Check that it is the Upshift CLI (--version), or set UPSHIFT_CLI to its path.',
          ),
        );
      }
    });
  });
}
