const { spawn } = require('node:child_process');

const PORT = 3000;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const routes = [
  '/',
  '/about-us',
  '/courses',
  '/blog',
  '/reviews',
  '/contact',
  '/python-expert',
  '/masterclass/chatgpt/free',
  '/masterclass/claude/free',
  '/admin/funnel-dashboard',
  '/admin/funnel-cohorts',
  '/admin/funnel-followups',
  '/admin/funnel-crm',
  '/admin/funnel-integrations',
];

const server = spawn(
  process.execPath,
  ['node_modules/next/dist/bin/next', 'start', '-p', String(PORT)],
  {
    env: { ...process.env, NODE_ENV: 'production' },
    stdio: ['ignore', 'pipe', 'pipe'],
  },
);

let serverLog = '';
server.stdout.on('data', (chunk) => {
  const text = chunk.toString();
  serverLog += text;
  process.stdout.write(text);
});
server.stderr.on('data', (chunk) => {
  const text = chunk.toString();
  serverLog += text;
  process.stderr.write(text);
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithTimeout(url, timeoutMs = 10000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      redirect: 'manual',
      signal: controller.signal,
      headers: { 'user-agent': 'sikhadenge-phase11-route-smoke/1.0' },
    });
  } finally {
    clearTimeout(timer);
  }
}

async function waitUntilReady() {
  for (let attempt = 1; attempt <= 60; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`Next.js server exited before readiness (code ${server.exitCode}).\n${serverLog}`);
    }

    try {
      const response = await fetchWithTimeout(`${BASE_URL}/`, 2500);
      if (response.status >= 200 && response.status < 500) return;
    } catch {
      // Server is still starting.
    }

    await sleep(500);
  }

  throw new Error(`Next.js server did not become ready.\n${serverLog}`);
}

async function main() {
  try {
    await waitUntilReady();

    for (const route of routes) {
      const response = await fetchWithTimeout(`${BASE_URL}${route}`);
      if (response.status < 200 || response.status >= 400) {
        throw new Error(`${route} returned HTTP ${response.status}`);
      }
      console.log(`ROUTE_SMOKE_PASS ${route} ${response.status}`);
    }

    console.log(`Production route smoke test: PASS (${routes.length} routes)`);
  } finally {
    if (server.exitCode === null) {
      server.kill('SIGTERM');
      await Promise.race([
        new Promise((resolve) => server.once('exit', resolve)),
        sleep(3000),
      ]);
      if (server.exitCode === null) server.kill('SIGKILL');
    }
  }
}

main().catch((error) => {
  console.error('Production route smoke test: FAIL');
  console.error(error);
  process.exitCode = 1;
});
