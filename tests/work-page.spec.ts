import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // The work-page interactions must not depend on third-party calendar uptime.
  await page.route('https://github-contributions-api.jogruber.de/**', route => route.abort());
});

test('GPU scenarios can be explored by mouse and keyboard and stay paused', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/work');
  const gpu = page.getByRole('figure', { name: 'GPU allocation walkthrough', exact: true });
  await gpu.getByRole('button', { name: 'Capacity', exact: true }).click();
  await expect(gpu.getByRole('button', { name: 'Capacity', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(gpu.getByText('no free capacity', { exact: true })).toBeVisible();
  await expect(gpu.getByRole('button', { name: 'Play walkthrough' })).toBeVisible();
  await gpu.getByRole('button', { name: 'Release', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(gpu.getByText('claim released', { exact: true })).toBeVisible();
  await page.clock.install();
  await page.clock.fastForward(10_000);
  await expect(gpu.getByRole('button', { name: 'Release', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('figure', { name: /walkthrough$/ })).toHaveCount(4);
  expect(errors).toEqual([]);
  await gpu.screenshot({ path: 'test-results/gpu-desktop.png', animations: 'disabled' });
});

test('GitHub contribution image opens the reference image modal', async ({ page }) => {
  await page.goto('/work');
  const image = page.getByRole('img', { name: /Piovation contribution chart with UtkarshSaxenautk/ });
  await expect(image).toBeVisible();
  await image.click();
  const modal = page.getByRole('dialog', { name: 'Image modal' });
  await expect(modal).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(modal).toHaveCount(0);
});

test('mobile reduced-motion view keeps controls usable without autoplay or overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/work');
  const gpu = page.getByRole('figure', { name: 'GPU allocation walkthrough', exact: true });
  await gpu.scrollIntoViewIfNeeded();
  await expect(gpu.getByRole('button', { name: 'Pause walkthrough' })).toBeDisabled();
  await expect(gpu.getByText('Reduced motion', { exact: true })).toBeVisible();
  await expect(gpu.locator('animateMotion')).toHaveCount(0);
  await gpu.getByRole('button', { name: 'Allocate', exact: true }).click();
  await expect(gpu.getByText('allocated', { exact: true })).toBeVisible();
  const dimensions = await page.evaluate(() => ({ width: innerWidth, content: document.documentElement.scrollWidth }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.width);
  await gpu.screenshot({ path: 'test-results/gpu-mobile.png', animations: 'disabled' });
});

test('all architecture recovery paths update their captions and status', async ({ page }) => {
  await page.goto('/work');
  const worker = page.getByRole('figure', { name: 'Cloud worker orchestration walkthrough', exact: true });
  await worker.getByRole('button', { name: 'Retry', exact: true }).click();
  await expect(worker.getByText('retry eligible', { exact: true })).toBeVisible();
  const deployment = page.getByRole('figure', { name: 'Container deployment and recovery walkthrough', exact: true });
  await deployment.getByRole('button', { name: 'Unhealthy', exact: true }).click();
  await expect(deployment.getByText('no new traffic', { exact: true })).toBeVisible();
  const events = page.getByRole('figure', { name: 'RabbitLoader event-driven microservices walkthrough', exact: true });
  await events.getByRole('button', { name: 'Respond', exact: true }).click();
  await expect(events.getByText('Protobuf response', { exact: true })).toBeVisible();
});

test('each architecture has its own topology and illustration behavior', async ({ page }) => {
  await page.goto('/work');
  const figures = page.getByRole('figure', { name: /walkthrough$/ });
  const compositions = await figures.evaluateAll(items => items.map(item => ({
    kind: item.querySelector('[data-illustration]')?.getAttribute('data-illustration'),
    paths: Array.from(item.querySelectorAll('svg > g > path[id]')).map(path => path.getAttribute('d')).join('|'),
  })));
  expect(new Set(compositions.map(item => item.kind)).size).toBe(4);
  expect(new Set(compositions.map(item => item.paths)).size).toBe(4);
  const worker = page.getByRole('figure', { name: 'Cloud worker orchestration walkthrough', exact: true });
  await worker.getByRole('button', { name: 'Dispatch', exact: true }).click();
  await expect(worker.locator('[data-illustration]')).toContainText('job 1');
  await worker.getByRole('button', { name: 'Play walkthrough' }).click();
  await expect(worker.locator('animateTransform')).toHaveCount(3);
  await worker.getByRole('button', { name: 'Pause walkthrough' }).click();
  await expect(worker.locator('animateTransform')).toHaveCount(0);
});
