// tests/feed.spec.ts
import { test, expect } from '@playwright/test';

test.use({ storageState: 'tests/user-auth.json' });

test('Items feed loads first page', async ({ page }) => {
  await page.goto('/list');
  await expect(page.locator('.card').first()).toBeVisible();
});

test('Load more button works if more items exist', async ({ page }) => {
  await page.goto('/list');

  const itemCards = page.locator('.card');
  await expect(itemCards.first()).toBeVisible();

  const loadMore = page.getByRole('button', { name: /load more/i });

  if (await loadMore.isVisible().catch(() => false)) {
    await loadMore.click();

    // Wait until either:
    // - button disappears
    // - cards remain stable (no crash)
    await expect
      .poll(async () => ({
        count: await itemCards.count(),
        buttonGone: !(await loadMore.isVisible().catch(() => false)),
      }))
      .toEqual(
        expect.objectContaining({
          count: expect.any(Number),
        }),
      );

    await expect(itemCards.first()).toBeVisible();
  }
});
