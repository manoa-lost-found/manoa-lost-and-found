import { NextRequest, NextResponse } from "next/server";

type ItemType = "LOST" | "FOUND";
type ItemStatus = "OPEN" | "TURNED_IN" | "WAITING_FOR_PICKUP" | "RECOVERED";

export type FeedItem = {
  id: number;
  title: string;
  description: string;
  type: ItemType;
  status: ItemStatus;
  imageUrl?: string | null;
  category: string;
  building: string;
  term: string; // e.g. "Fall 2025"
  date: string; // ISO-like date, ex: "2025-11-01"
  locationName?: string | null;
};

// 🔹 In-memory store for now (replace with Prisma later)
let items: FeedItem[] = [
  {
    id: 1,
    title: "Blue Hydroflask with dog stickers",
    description:
      "Blue Hydroflask with straw lid and dog stickers. Small dent on one side.",
    type: "LOST",
    status: "OPEN",
    category: "Bottle",
    building: "POST 309",
    term: "Fall 2025",
    date: "2025-11-01",
    imageUrl: "/images/sample-hydroflask.jpg",
    locationName: null,
  },
  {
    id: 2,
    title: "AirPods (2nd Gen)",
    description:
      "White AirPods case, slightly scratched. Found under a table near the computers.",
    type: "FOUND",
    status: "TURNED_IN",
    category: "Electronics",
    building: "Hamilton Library",
    term: "Fall 2025",
    date: "2025-10-27",
    imageUrl: "/images/sample-airpods.jpg",
    locationName: "Campus Center Information Desk",
  },
  {
    id: 3,
    title: "Green UH Hoodie",
    description:
      "Green UH Mānoa hoodie, size L, left on a bench outside Bilger. Looks new.",
    type: "FOUND",
    status: "WAITING_FOR_PICKUP",
    category: "Clothing",
    building: "Bilger",
    term: "Spring 2026",
    date: "2026-01-15",
    imageUrl: "/images/sample-hoodie.jpg",
    locationName: "Hamilton Library Front Desk",
  },
];

let nextId = items.length + 1;

export async function GET() {
  return NextResponse.json({ items }, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Basic validation – you can tighten this later
    if (
      !body.title ||
      !body.description ||
      !body.type ||
      !body.category ||
      !body.building ||
      !body.term
    ) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const type: ItemType = body.type === "FOUND" ? "FOUND" : "LOST";
    const status: ItemStatus =
      body.status && ["OPEN", "TURNED_IN", "WAITING_FOR_PICKUP", "RECOVERED"].includes(body.status)
        ? body.status
        : type === "LOST"
        ? "OPEN"
        : "WAITING_FOR_PICKUP";

    const nowIso = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    const newItem: FeedItem = {
      id: nextId++,
      title: String(body.title),
      description: String(body.description),
      type,
      status,
      category: String(body.category),
      building: String(body.building),
      term: String(body.term),
      date: body.date ? String(body.date) : nowIso,
      imageUrl: body.imageUrl ?? null,
      locationName: body.locationName ?? null,
    };

    items.unshift(newItem); // newest at top

    return NextResponse.json({ item: newItem }, { status: 201 });
  } catch (err) {
    console.error("Error in POST /api/items:", err);
    return NextResponse.json(
      { error: "Failed to create item." },
      { status: 500 }
    );
  }
}
