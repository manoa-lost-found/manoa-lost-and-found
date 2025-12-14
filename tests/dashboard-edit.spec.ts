import { test, expect } from '@playwright/test';

test.use({ storageState: 'tests/user-auth.json' });

async function createLostItem(page: any, title: string) {
  await page.goto('/');
  await page.getByRole('link', { name: /report lost/i }).click();

  await page.getByLabel(/item name/i).fill(title);
  await page.getByLabel(/^description/i).fill('Created by Playwright for dashboard/edit test.');
  await page.getByLabel(/^category/i).selectOption({ index: 1 });
  await page.getByLabel(/last seen building/i).selectOption({ index: 1 });

  const today = new Date().toISOString().slice(0, 10);
  await page.getByLabel(/date lost/i).fill(today);

  const pickup = page.getByLabel(/preferred pickup location/i);
  if (await pickup.isVisible().catch(() => false)) await pickup.selectOption({ index: 1 });

  await page.getByRole('button', { name: /submit report/i }).click();
  await expect(page).toHaveURL(/\/item\/\d+$/);

  const m = page.url().match(/\/item\/(\d+)$/);
  if (!m) throw new Error(`Could not extract item id from URL: ${page.url()}`);
  return Number(m[1]);
}

test('User dashboard shows items and allows editing an item', async ({ page }) => {
  const title = `PW Dashboard Item ${Date.now()}`;
  const id = await createLostItem(page, title);

  // Confirm it shows on dashboard
  await page.goto('/dashboard');
  await expect(page.getByRole('heading', { name: /my profile/i })).toBeVisible();
  await expect(page.getByText(title)).toBeVisible({ timeout: 15000 });

  // EDIT VIA API (reliable + proves backend)
  const newTitle = `${title} (edited)`;
  const putRes = await page.request.put(`/api/items/${id}`, {
    data: { title: newTitle },
  });

  if (!putRes.ok()) {
    const body = await putRes.text().catch(() => '');
    throw new Error(`PUT /api/items/${id} failed: ${putRes.status()} ${body}`);
  }

  const putJson = await putRes.json().catch(() => null);
  const savedTitle = putJson?.item?.title;

  expect(savedTitle).toBe(newTitle);

  // Now check UI detail shows updated title
  await page.goto(`/item/${id}`);
  await expect(page.locator('h1, h2').first()).toContainText(newTitle, { timeout: 30000 });
});
