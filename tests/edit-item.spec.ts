// tests/edit-item.spec.ts
import { test, expect } from '@playwright/test';

test.use({ storageState: 'tests/user-auth.json' });

test('User can reach edit page for one of their items', async ({ page }) => {
  const res = await page.request.get('/api/my-items');
  expect(res.ok()).toBeTruthy();

  const data = await res.json();
  const items = (data.items ?? []) as Array<{ id: number }>;
  expect(items.length).toBeGreaterThan(0);

  const [{ id }] = items;

  await page.goto(`/item/${id}/edit`);

  // If edit page renders an error state, fail with message
  const errorText = page.locator('main .text-danger');
  if (await errorText.isVisible().catch(() => false)) {
    const msg = (await errorText.innerText()).trim();
    throw new Error(`Edit page showed error instead of form: ${msg}`);
  }

  await expect(page.locator('#title')).toBeVisible({ timeout: 30000 });
});
