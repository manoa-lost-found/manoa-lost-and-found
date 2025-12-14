import { test, expect } from '@playwright/test';

test.use({ storageState: 'tests/user-auth.json' });

test('User can open Report Lost form and see required fields', async ({ page }) => {
  await page.goto('/');

  const reportLost = page.getByRole('link', { name: /^report lost$/i }).first();
  await expect(reportLost).toBeVisible();

  // Extract href and go there (prevents guessing route)
  const href = await reportLost.getAttribute('href');
  expect(href).toBeTruthy();

  await page.goto(href!);

  // Now assert form fields using labels (more stable than #id)
  await expect(page.getByLabel(/item name/i)).toBeVisible();
  await expect(page.getByLabel(/description/i)).toBeVisible();
  await expect(page.getByLabel(/category/i)).toBeVisible();
  await expect(page.getByLabel(/building/i)).toBeVisible();
});
