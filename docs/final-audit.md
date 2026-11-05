# Pre-commit portfolio audit

Reviewed 5 November 2026. This audit accompanies the portfolio work commit; Vercel configuration follows separately.

## Identity and template cleanup

- Home, work, background and all four project pages use Utkarsh Saxena's personal details. No previous-owner name, signature, profile, company link or social account appears in their rendered content.
- The footer uses the vector contours of the supplied handwritten signature at 36px high.
- Removed unused previous-company icons, badge mappings, old work-diagram components and the previous owner's remote image domain. Renamed the inherited animation identifier to a neutral diagram name.
- The reference folder remains ignored. Source provenance in README and asset documentation is retained intentionally. Generic template layout, interactions, sounds and Crafts UI examples remain as requested.

## Browser and sharing identity

- Tab favicon, PNG icon, Apple icon and 192/512px manifest icons use crops of the supplied portrait.
- Open Graph and Twitter metadata use a 1200×630 JPEG preview with Utkarsh's portrait, name and role. The previous text-only SVG preview and initials icons were removed.
- Production requirement: set NEXT_PUBLIC_SITE_URL to the final public HTTPS origin before building. The local fallback cannot provide publicly reachable share-image URLs. Sharing services may retain an older preview until they recrawl the URL.

## Validation

- Production build passed, including TypeScript and static route generation.
- All 13 Chromium checks passed across seven pages: identity/links, local images, share metadata, icon endpoints, resume PDF, signature size, image modal, keyboard scenarios, unique diagram topologies, pause/play and mobile reduced motion/overflow.
- Generated portrait assets were visually inspected. No page runtime errors were observed during the audit.
- The temporary verification server on port 3002 was stopped. Existing user-owned local servers were left alone.

## Items to resolve or retain knowingly

- Piovation's contribution graphic currently on disk is a derivative of the earlier demo image, with 972 commits / 168,192 additions. It is not the later chat screenshot showing 2,842 commits / 449,192 additions. The surrounding demo wording has been removed at the user's request. Replacement with the latest supplied screenshot is pending a locally accessible file; no private-repository statistics were independently verified.
- HTML Optimizer retains the artwork selected in Utkarsh's older portfolio. Its exact public repository is still unconfirmed, so no source link is shown.
- Crafts contains template UI examples, not newly claimed engineering projects.
- Redundant root portrait, resume and signature scans were removed. Required portrait/PDF assets remain in public; original content notes moved to docs/profile-source.md.
- No deployment was performed during this audit.
