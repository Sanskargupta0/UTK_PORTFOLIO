# Vercel deployment

1. Import the GitHub repository into Vercel after merging the PR.
2. Use the repository root (`./`) as Root Directory and select the branch you merge into as Production Branch.
3. Framework: Next.js. Node: 24.x, pinned by package.json. Install: npm ci. Build: npm run build. Leave Output Directory at the Next.js default; do not set it to out or dist.
4. Deploy. No application secrets are required for the current contact links, public GitHub calendar, resume download or static assets.

The versioned vercel.json sets the framework and npm commands. The package lock is committed for reproducible dependency installation. Native Next.js handles routing, image optimization and static asset caching; the obsolete Cloudflare-style public/_headers file was removed.

## Shared previews and domains

The metadata origin is chosen in this order: NEXT_PUBLIC_SITE_URL override, Vercel production domain (including its framework-prefixed variant), deployment URL, then localhost for local development. This keeps social image URLs public and stable across builds. The portrait preview is /social.jpg.

Vercel exposes the production domain automatically when system environment variables are enabled (Project Settings → Environment Variables). To choose a specific custom domain, add it in Vercel Domains and optionally set NEXT_PUBLIC_SITE_URL to its complete HTTPS origin, for example https://your-domain.example. Redeploy after changing the value. Leave this variable empty for automatic detection; do not copy a localhost value into the production environment.

Sharing services may cache old cards. Refresh their preview after deployment if an earlier image persists. Protected preview deployments may not be accessible to social crawlers; verify the final public production URL.

## Optional analytics

Only configure the analytics variables listed in .env.example if you want those services. Without values, analytics are disabled. Email and phone buttons do not need a backend. The resume, profile, company/project images and signatures are already local assets; no external file hosting is required.

## Local checks

Run npm ci, npm run test:deployment and npm run build. Run npm start and, in another terminal, npm run test:e2e for browser checks. PowerShell can use npm.cmd if npm.ps1 is blocked.

No deployment or Vercel project/account changes are performed by these configuration files.

Validation completed locally: production build, 13 Chromium browser checks, and seven tests covering local/custom/Vercel production/deployment origin selection. The temporary test server was stopped afterward.

References: [Vercel configuration](https://vercel.com/docs/project-configuration), [Node versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions), [Vercel domain variables](https://vercel.com/docs/environment-variables/system-environment-variables).
