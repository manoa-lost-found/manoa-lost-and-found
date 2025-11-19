export default function LostItemForm() {
    return (
      <div className="max-w-xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Report Lost Item</h1>
  
        <div className="bg-white p-6 shadow rounded-xl space-y-4">
          <div>
            <label className="font-semibold">Item Name</label>
            <input className="w-full border p-2 rounded mt-1" placeholder="AirPods, Water Bottle..." />
          </div>
  
          <div>
            <label className="font-semibold">Category</label>
            <select className="w-full border p-2 rounded mt-1">
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Stationary</option>
            </select>
          </div>
  
          <div>
            <label className="font-semibold">Last Seen Location</label>
            <input className="w-full border p-2 rounded mt-1" placeholder="Building / Room" />
          </div>
  
          <div>
            <label className="font-semibold">Description</label>
            <textarea className="w-full border p-2 rounded mt-1" rows={4} />
          </div>
  
          <button className="w-full bg-emerald-700 text-white py-3 rounded-lg font-semibold hover:bg-emerald-800">
            Submit Lost Item
          </button>
        </div>
      </div>
    );
  }
  