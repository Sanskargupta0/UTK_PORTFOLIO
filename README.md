# Utkarsh Saxena Portfolio

The root app now uses inspiration/lokendra.tech. Its Next.js layout, fonts, dither background, expandable experience rows, project/craft tabs, sound toggle and themes are retained. Reference folders are Git-ignored. The personalized baseline was committed as 73010c2 before the work-page update. No deployment has been made.

Run: npm install, then npm run dev. Build: npm run build. Production: npm start. Type check: npm run typecheck. Use npm.cmd in PowerShell if npm.ps1 is blocked.

Personal content is in config/userData.ts, config/background.ts and content/work.mdx. The supplied resume is stored at public/Utkarsh-Saxena-Resume.pdf and connected to download/open buttons. The portrait is public/profile.png and the signature is a vector component. Redundant root image/PDF/signature scans were removed; source notes are retained in docs/profile-source.md. Email, phone, GitHub and LinkedIn links use Utkarsh's supplied details.

Review at http://localhost:3000 after starting the app. The supplied profile photo, company logos and project images are connected. LinkedIn SDK, Typing Multiplayer Game and Electric Bill Optimizer have verified repository links. HTML Optimizer uses artwork from the older portfolio; its exact repository is still unconfirmed. The Crafts tab retains the original template UI demos.

Before deployment, set NEXT_PUBLIC_SITE_URL to the final domain. Analytics are optional and disabled without environment values. Contact uses mailto and telephone links; no backend credentials are required. Original-owner blogs, galleries and achievements have been removed.


Asset provenance is recorded in docs/asset-sources.md. Sound behavior matches the template: enable sounds with the speaker button; company links and controls then play the existing hover and tap sounds.

The work page reuses the reference's isometric SVG animation engine for GPU allocation, cloud workers, container recovery and event-driven services. Select a scenario to explore it; Play resumes automatic scenario changes. Reduced-motion preferences disable automatic changes and moving particles. The diagrams are simplified logical walkthroughs, not production topology or incident reports.

The Piovation section uses public/work/piovation-contributors.png with a neutral contribution heading and no demo wording. Replacement with the latest user-supplied chat screenshot is pending access to its local file. The live public GitHub calendar remains separate.

A separate public-data graphic can be regenerated from content/github-evidence.json with npm run generate:github, or refreshed from the public APIs with npm run generate:github -- --refresh. Both SVG and PNG files are written to public/work. Run npm run test:e2e against a running app for the work-page browser checks (install Chromium with npx playwright install chromium first).

Browser icons, Apple/PWA icons and the JPEG social preview all use Utkarsh's supplied portrait. Regenerate them with node scripts/generate-brand-assets.mjs. Set NEXT_PUBLIC_SITE_URL to the production HTTPS origin before building for deployment so shared-image URLs resolve publicly. See docs/final-audit.md for the pre-commit review.
