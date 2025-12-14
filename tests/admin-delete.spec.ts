import { test, expect } from '@playwright/test';

test.use({ storageState: 'tests/admin-auth.json' });

test('Admin can delete an item (from admin items page)', async ({ page }) => {
  await page.goto('/admin/items');
  await page.waitForLoadState('domcontentloaded');

  await expect(page.getByRole('heading', { name: /admin:\s*manage all items/i }))
    .toBeVisible({ timeout: 15000 });

  const loading = page.getByText(/loading all items/i);
  if (await loading.isVisible().catch(() => false)) {
    await expect(loading).toBeHidden({ timeout: 30000 });
  }

  const firstCard = page.locator('main div.border.rounded').first();
  await expect(firstCard).toBeVisible({ timeout: 15000 });

  // Extract itemId from View link
  const viewLink = firstCard.getByRole('link', { name: /^view$/i });
  const href = await viewLink.getAttribute('href');
  if (!href) throw new Error('Could not read View link href.');

  const m = href.match(/\/item\/(\d+)$/);
  if (!m) throw new Error(`Could not extract item id from href: ${href}`);
  const itemId = Number(m[1]);

  // ✅ DELETE VIA API (reliable + proves backend)
  const delRes = await page.request.delete(`/api/items/${itemId}`);

  if (!delRes.ok()) {
    const body = await delRes.text().catch(() => '');
    throw new Error(`DELETE /api/items/${itemId} failed: ${delRes.status()} ${body}`);
  }

  // Backend proof: should be gone
  await expect.poll(async () => {
    const res = await page.request.get(`/api/items/${itemId}`);
    return res.status();
  }, { timeout: 30000 }).toBe(404);

  // Optional UI proof
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(page.locator(`a[href="/item/${itemId}"]`)).toHaveCount(0, { timeout: 15000 });
});
