import { test, expect } from '@playwright/test';

test('FAQ page loads', async ({ page }) => {
  await page.goto('/faq');
  await expect(page.getByRole('heading', { name: /manoa lost & found faq/i })).toBeVisible();
});

test('Turn-in instructions page loads', async ({ page }) => {
  await page.goto('/instructions/turn-in');
  await expect(page.getByRole('heading', { name: /how to turn in/i })).toBeVisible();
  await expect(page.getByText(/locations & offices/i)).toBeVisible();
});

test('Recovery instructions page loads', async ({ page }) => {
  await page.goto('/instructions/recovery');
  await expect(page.getByRole('heading', { name: /how to recover/i })).toBeVisible();
  await expect(page.getByText(/pickup locations/i)).toBeVisible();
});
