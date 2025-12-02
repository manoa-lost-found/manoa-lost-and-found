// tests/public-pages.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Public & protected pages availability', () => {
  test('Landing page loads', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('heading', { name: /Find it\. Report it\. Reunite it\./i }),
    ).toBeVisible();
  });

  test('FAQ page loads', async ({ page }) => {
    await page.goto('/faq');
    // Use the page heading instead of ambiguous text
    await expect(
      page.getByRole('heading', { name: 'FAQ' }),
    ).toBeVisible();
  });

  test('Items feed page loads', async ({ page }) => {
    await page.goto('/list');
    await expect(
      page.getByRole('heading', { name: /Find it\. Report it\. Reunite it\./i }),
    ).toBeVisible();
  });

  // --- Availability checks only (no redirect expectation) ---

  test('Report Lost page responds without server error', async ({ page }) => {
    const response = await page.goto('/report/lost');
    expect(response?.ok()).toBeTruthy();         // status 2xx/3xx
  });

  test('Report Found page responds without server error', async ({ page }) => {
    const response = await page.goto('/report/found');
    expect(response?.ok()).toBeTruthy();
  });

  test('Dashboard page responds without server error (even if it redirects client-side)', async ({ page }) => {
    const response = await page.goto('/dashboard');
    // As long as the initial response isn't a 5xx, the route is "available"
    expect(response?.status()).toBeLessThan(500);
  });
});
