import { expect, test } from '@playwright/test';
import { projectDetails } from '../config/background';

test.beforeEach(async ({ page }) => {
  await page.route('https://github-contributions-api.jogruber.de/**', route => route.abort());
});

for (const route of ['/', '/work', '/background', ...projectDetails.map(project => `/projects/${project.id}`)]) {
  test(`personal branding and local assets: ${route}`, async ({ page, request }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('body')).not.toContainText(/Lokendra|Kushwah|Keychain|Induced AI|Unolo/);
    await expect(page.locator('a[href*="lokendra"], a[href*="ramx.in"]')).toHaveCount(0);
    const sources = await page.locator('img').evaluateAll(images => [...new Set(images.map(image => image.getAttribute('src')).filter(Boolean))]);
    for (const source of sources) {
      if (source?.startsWith('/')) {
        const asset = await request.get(source);
        expect(asset.ok(), source).toBe(true);
        expect(asset.headers()['content-type'], source).toContain('image/');
      }
    }
    expect(errors).toEqual([]);
  });
}

test('photo-based tab icons, share metadata and resume are wired', async ({ page, request }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Utkarsh Saxena');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /\/social\.jpg$/);
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', /\/social\.jpg$/);
  await expect(page.locator('link[rel="icon"][type="image/png"]')).toHaveAttribute('href', /\/icon\.png/);
  for (const path of ['/icon.png', '/apple-icon.png', '/favicon.ico', '/social.jpg', '/icons/profile-192.png', '/icons/profile-512.png']) {
    const asset = await request.get(path);
    expect(asset.ok(), path).toBe(true);
    expect(asset.headers()['content-type'], path).toContain('image/');
  }
  const signature = page.getByRole('img', { name: "Utkarsh Saxena's handwritten signature" });
  await expect(signature).toHaveCSS('height', '36px');
  const resume = await request.get('/Utkarsh-Saxena-Resume.pdf');
  expect(resume.ok()).toBe(true);
  expect((await resume.body()).subarray(0, 4).toString()).toBe('%PDF');
});
