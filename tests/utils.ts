// tests/utils.ts
import type { APIRequestContext } from '@playwright/test';

type ItemType = 'LOST' | 'FOUND';
type ItemStatus = 'OPEN' | 'TURNED_IN' | 'WAITING_FOR_PICKUP' | 'RECOVERED';

export type CreateItemInput = {
  title: string;
  description: string;
  type: ItemType;
  status: ItemStatus;
  category: string;
  building: string;
  term: string;
  date: string; // YYYY-MM-DD
  locationName?: string | null;
  pickupLocation?: string | null;
  imageUrl?: string | null;
};

export async function apiCreateItem(
  request: APIRequestContext,
  input: CreateItemInput,
): Promise<number> {
  const res = await request.post('/api/items', { data: input });

  if (!res.ok()) {
    const text = await res.text().catch(() => '');
    throw new Error(`apiCreateItem failed (${res.status()}): ${text}`);
  }

  const json = (await res.json()) as any;

  // support either { item: { id }} or { id }
  const id = json?.item?.id ?? json?.id;
  if (id === undefined || id === null) {
    throw new Error(
      `apiCreateItem: no id returned. Response: ${JSON.stringify(json)}`,
    );
  }

  return Number(id);
}
