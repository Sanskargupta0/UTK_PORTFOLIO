import { expect, test } from '@playwright/test';

test('Vercel SDKs load once across navigation and metadata uses the public domain', async ({ page }) => {
  // Local Next servers do not provide Vercel's collection routes. Stub the
  // scripts to verify SDK wiring without sending browser-test traffic.
  await page.route('**/_vercel/**', route => route.fulfill({
    status: 200,
    contentType: 'application/javascript',
    body: '/* Vercel script stub for local integration checks. */',
  }));
  await page.route('https://github-contributions-api.jogruber.de/**', route => route.abort());
  await page.goto('/');
  const analytics = page.locator('script[src="/_vercel/insights/script.js"]');
  const speed = page.locator('script[src="/_vercel/speed-insights/script.js"]');
  await expect(analytics).toHaveCount(1);
  await expect(speed).toHaveCount(1);
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', /^https:\/\/utkarshsaxena\.dev\/?$/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://utkarshsaxena.dev/social.jpg');
  await page.locator('a[href="/background"]').first().click();
  await expect(page).toHaveURL(/\/background$/);
  await expect(analytics).toHaveCount(1);
  await expect(speed).toHaveCount(1);
});
