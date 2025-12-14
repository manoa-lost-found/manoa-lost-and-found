// tests/item-detail.spec.ts
import { test, expect } from '@playwright/test';
import { apiCreateItem } from './utils';

test.use({ storageState: 'tests/user-auth.json' });

test('Lost item detail shows pickup location', async ({ page }) => {
  await page.goto('/list'); // ensures auth/session is active

  const id = await apiCreateItem(page.request, {
    title: `PW Detail ${Date.now()}`,
    description: 'Detail test',
    type: 'LOST',
    status: 'OPEN',
    category: 'Electronics',
    building: 'Hamilton Library',
    term: 'Fall 2025',
    date: new Date().toISOString().slice(0, 10),
    locationName: 'Near entrance',
    pickupLocation: 'Hamilton Library (Front Desk)', // LOST preferred pickup
    imageUrl: null,
  });

  await page.goto(`/item/${id}`);
  await expect(page.getByRole('heading')).toBeVisible();

  // Avoid generic /pickup/i because navbar dropdown contains “pickup”
  await expect(page.getByText(/Hamilton Library \(Front Desk\)/i)).toBeVisible();
});
