# Utkarsh Saxena Portfolio

[utkarshsaxena.dev](https://utkarshsaxena.dev) — Utkarsh's portfolio covering Golang development, cloud infrastructure, distributed systems and product engineering.

Built with Next.js App Router, React, TypeScript, Tailwind CSS and Motion. Includes interactive architecture walkthroughs, work history, projects, a downloadable resume, photo-based social previews and a traced handwritten signature.

## Local development

Use Node.js 24.x and npm:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. In PowerShell, use `npm.cmd` if `npm.ps1` is blocked.

```sh
npm run build          # Production build and type checking
npm start              # Serve the production build
npm run test:deployment # Domain-resolution checks
npm run test:e2e        # Browser checks against a running app
```

Install the browser once with `npx playwright install chromium`. Set `PLAYWRIGHT_BASE_URL` when testing a server on a different port.

## Content and assets

- `config/userData.ts`: personal details, roles, contacts and project cards.
- `config/background.ts`: skills, education/coding profiles and project details.
- `content/work.mdx`: detailed work narrative and architecture walkthroughs.
- `public/profile.png`, `public/Utkarsh-Saxena-Resume.pdf`: portrait and connected resume.
- `components/ui/signature.tsx`: vector signature.
- `scripts/generate-brand-assets.mjs`: regenerates icons and the social preview.
- `scripts/generate-github-evidence.mjs`: regenerates the separate public GitHub activity graphic; add `--refresh` to fetch current public data.

Architecture diagrams are simplified logical explanations. Asset sources and content review notes are recorded in [docs/asset-sources.md](docs/asset-sources.md) and [docs/final-audit.md](docs/final-audit.md).

## Vercel deployment and domain

Import the repository into Vercel with the root directory `./`. `vercel.json` defines the Next.js preset, `npm ci` installation and `npm run build`. Keep the output directory at its default.

Add `utkarshsaxena.dev` to the project's Domains settings. Production builds use `https://utkarshsaxena.dev` for social/share metadata. `NEXT_PUBLIC_SITE_URL` can override that origin; local development defaults to localhost. No backend credentials are needed for the current contact links and resume download.

Full instructions: [docs/vercel-deployment.md](docs/vercel-deployment.md).

## Analytics and performance

[Vercel Web Analytics](https://vercel.com/docs/analytics/quickstart) and [Speed Insights](https://vercel.com/docs/speed-insights/quickstart) are integrated once in `app/layout.tsx` through `@vercel/analytics/next` and `@vercel/speed-insights/next`. They cover all routes and require no application API keys.

In the Vercel project dashboard, enable **Web Analytics** and **Speed Insights**, then deploy this change. Visit the production site to start collecting page views and performance measurements. Dashboard activation is separate from installing the SDKs; data collection cannot be verified from a local build.

Additional PostHog, Umami, Clarity and Visitors integrations remain optional and require their own environment values from `.env.example`.

## Template provenance

The design and shared UI interactions were adapted from the supplied `inspiration/lokendra.tech` template. The reference directory is Git-ignored; the Crafts tab retains its UI component examples. Personal branding and work content use Utkarsh's details.
