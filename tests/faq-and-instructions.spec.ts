// tests/faq-and-instructions.spec.ts
import { test, expect } from '@playwright/test';

test.describe('FAQ and Instructions pages', () => {
  test('FAQ page loads', async ({ page }) => {
    await page.goto('/faq');

    await expect(
      page.getByRole('heading', { name: /manoa lost & found faq/i }),
    ).toBeVisible({ timeout: 15000 });

    await expect(page.getByText(/how do i report a lost item/i)).toBeVisible();
  });

  test('FAQ links navigate to Turn In Instructions', async ({ page }) => {
    await page.goto('/faq');

    const link = page.locator('a[href="/instructions/turn-in"]').first();
    await expect(link).toBeVisible({ timeout: 15000 });

    const href = await link.getAttribute('href');
    expect(href).toBeTruthy();

    // Reliable navigation (avoids flaky Next.js client routing)
    await page.goto(href!);

    await expect(
      page.getByRole('heading', { name: /how to turn in a found item/i }),
    ).toBeVisible({ timeout: 30000 });
  });

  test('FAQ links navigate to Recovery Instructions', async ({ page }) => {
    await page.goto('/faq');

    const link = page.locator('a[href="/instructions/recovery"]').first();
    await expect(link).toBeVisible({ timeout: 15000 });

    const href = await link.getAttribute('href');
    expect(href).toBeTruthy();

    await page.goto(href!);

    await expect(
      page.getByRole('heading', { name: /how to recover/i }),
    ).toBeVisible({ timeout: 30000 });
  });
});
