# Vercel deployment

1. Import the GitHub repository into Vercel after merging the PR.
2. Use the repository root (`./`) as Root Directory and select the branch you merge into as Production Branch.
3. Framework: Next.js. Node: 24.x, pinned by package.json. Install: npm ci. Build: npm run build. Leave Output Directory at the Next.js default; do not set it to out or dist.
4. Deploy. No application secrets are required for the current contact links, public GitHub calendar, resume download or static assets.

The versioned vercel.json sets the framework and npm commands. The package lock is committed for reproducible dependency installation. Native Next.js handles routing, image optimization and static asset caching; the obsolete Cloudflare-style public/_headers file was removed.

## Shared previews and domains

Production builds use https://utkarshsaxena.dev for their metadata origin, including preview builds so shared images point to the public site. NEXT_PUBLIC_SITE_URL overrides this when explicitly set. During development, Vercel domain variables can be detected automatically, with localhost as the fallback. The portrait preview is /social.jpg.

Add utkarshsaxena.dev in the Vercel project's Domains settings and follow Vercel's DNS instructions. NEXT_PUBLIC_SITE_URL can select a different complete HTTPS origin if needed. Redeploy after changing that value. Leave it empty to use the production default; do not copy a localhost value into the production environment.

Sharing services may cache old cards. Refresh their preview after deployment if an earlier image persists. Protected preview deployments may not be accessible to social crawlers; verify the final public production URL.

## Vercel Analytics and Speed Insights

The root layout includes Analytics from @vercel/analytics/next and SpeedInsights from @vercel/speed-insights/next on all routes. No API keys or application environment variables are required for these Vercel integrations.

In the Vercel project dashboard, enable Web Analytics and Speed Insights, then deploy the updated application. The SDKs are integrated in code; dashboard activation and live collection have not been performed from this workspace. Visit the public site after deployment to generate measurements.

PostHog, Umami, Clarity and Visitors are separate optional providers. Configure their environment variables only if wanted; without values those providers remain disabled. Email and phone buttons do not need a backend. The resume, portrait, company/project images and signature are already local assets.

## Local checks

Run npm ci, npm run test:deployment and npm run build. Run npm start and, in another terminal, npm run test:e2e for browser checks. PowerShell can use npm.cmd if npm.ps1 is blocked.

No deployment or Vercel project/account changes are performed by these configuration files.

Validation commands cover production builds, Chromium browser checks and local/custom/Vercel/production origin selection. Local builds do not prove live analytics collection.

References: [Vercel configuration](https://vercel.com/docs/project-configuration), [Node versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions), [Vercel domain variables](https://vercel.com/docs/environment-variables/system-environment-variables).

Integration guides: [Web Analytics](https://vercel.com/docs/analytics/quickstart), [Speed Insights](https://vercel.com/docs/speed-insights/quickstart).
