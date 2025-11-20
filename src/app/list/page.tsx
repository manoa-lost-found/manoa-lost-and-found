// src/app/list/page.tsx

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import authOptions from '@/lib/authOptions';

export default async function LostFoundFeed() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-white p-6 shadow-md rounded-xl">

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Lost/Found Feed</h1>
            <span className="text-gray-500">with filters</span>
          </div>

          <button type="button" className="text-emerald-700 font-semibold">
            SORT
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filter Sidebar */}
          <div className="col-span-1 border-r pr-4">
            <h2 className="font-semibold mb-4">Filter by</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="filterCategory" className="font-semibold text-sm">
                  Category
                  <select
                    id="filterCategory"
                    className="w-full mt-1 border rounded-md p-2 text-sm"
                  >
                    <option>Stationary</option>
                    <option>Electronics</option>
                    <option>Clothing</option>
                  </select>
                </label>
              </div>

              <div>
                <label htmlFor="filterBuilding" className="font-semibold text-sm">
                  Building
                  <select
                    id="filterBuilding"
                    className="w-full mt-1 border rounded-md p-2 text-sm"
                  >
                    <option>POST 309</option>
                    <option>Bilger</option>
                    <option>Hamilton Library</option>
                  </select>
                </label>
              </div>

              <div>
                <label htmlFor="filterSemester" className="font-semibold text-sm">
                  Found
                  <select
                    id="filterSemester"
                    className="w-full mt-1 border rounded-md p-2 text-sm"
                  >
                    <option>Fall 2025</option>
                    <option>Spring 2026</option>
                  </select>
                </label>
              </div>
            </div>
          </div>

          {/* Empty Feed */}
          <div className="col-span-3 flex flex-col items-center justify-center py-10">
            <p className="text-gray-500 text-lg font-medium">
              No items have been reported.
            </p>
          </div>
        </div>

        <h2 className="text-center mt-10 text-xl font-semibold">
          Lost/Found Feed
        </h2>
      </div>
    </div>
  );
}
