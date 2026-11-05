import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

const variables = ['NEXT_PUBLIC_SITE_URL', 'VERCEL_PROJECT_PRODUCTION_URL', 'NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL', 'VERCEL_URL', 'NEXT_PUBLIC_VERCEL_URL'];
const cases = [
  ['local fallback', {}, 'http://localhost:3000'],
  ['Vercel production domain', { VERCEL_PROJECT_PRODUCTION_URL: 'utkarsh.vercel.app' }, 'https://utkarsh.vercel.app'],
  ['production domain takes precedence over deployment URL', { VERCEL_PROJECT_PRODUCTION_URL: 'utkarsh.example', VERCEL_URL: 'utkarsh-preview.vercel.app' }, 'https://utkarsh.example'],
  ['framework-prefixed production URL', { NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: 'utkarsh.vercel.app' }, 'https://utkarsh.vercel.app'],
  ['deployment URL fallback', { VERCEL_URL: 'utkarsh-preview.vercel.app' }, 'https://utkarsh-preview.vercel.app'],
  ['custom origin override', { NEXT_PUBLIC_SITE_URL: ' https://portfolio.example/ ', VERCEL_PROJECT_PRODUCTION_URL: 'utkarsh.vercel.app' }, 'https://portfolio.example'],
  ['empty override uses Vercel', { NEXT_PUBLIC_SITE_URL: '', VERCEL_PROJECT_PRODUCTION_URL: 'utkarsh.vercel.app' }, 'https://utkarsh.vercel.app'],
];
for (const [name, overrides, expected] of cases) {
  test(name, () => {
    const env = { ...process.env };
    for (const name of variables) delete env[name];
    Object.assign(env, overrides);
    const run = spawnSync(process.execPath, ['--input-type=module', '-e', "const {siteConfig}=await import('./config/site.ts'); process.stdout.write(siteConfig.url);"], { env, encoding: 'utf8' });
    assert.equal(run.status, 0, run.stderr);
    assert.equal(run.stdout, expected);
  });
}
