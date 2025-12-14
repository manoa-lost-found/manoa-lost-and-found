// tests/permissions.spec.ts
import { test, expect } from '@playwright/test';

test.use({ storageState: 'tests/admin-auth.json' });

test('Admin can edit any item (from admin items page)', async ({ page }) => {
  await page.goto('/admin/items');

  await expect(
    page.getByRole('heading', { name: /admin:\s*manage all items/i }),
  ).toBeVisible({ timeout: 15000 });

  const loading = page.getByText(/loading all items/i);
  if (await loading.isVisible().catch(() => false)) {
    await expect(loading).toBeHidden({ timeout: 30000 });
  }

  const editLink = page.getByRole('link', { name: /^edit$/i }).first();
  await expect(editLink).toBeVisible({ timeout: 15000 });

  const href = await editLink.getAttribute('href');
  expect(href).toMatch(/^\/item\/\d+\/edit$/);

  await page.goto(href!);

  await expect(page.locator('#title')).toBeVisible({ timeout: 30000 });
});
