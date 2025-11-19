export default function AddLostPage() {
  return (
    <div className="container mt-4">
      <h1 className="fw-bold">Report Lost Item</h1>

      <form className="mt-4">

        <div className="mb-3">
          <label htmlFor="lostItemName" className="form-label">
            Item Name
            <input
              id="lostItemName"
              name="lostItemName"
              className="form-control"
            />
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="lostLocation" className="form-label">
            Last Seen Location
            <input
              id="lostLocation"
              name="lostLocation"
              className="form-control"
            />
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="lostDate" className="form-label">
            Date Lost
            <input
              id="lostDate"
              name="lostDate"
              type="date"
              className="form-control"
            />
          </label>
        </div>

        <button type="submit" className="btn btn-success">
          Submit
        </button>

      </form>
    </div>
  );
}
