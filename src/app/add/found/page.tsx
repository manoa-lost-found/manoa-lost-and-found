export default function AddFoundPage() {
  return (
    <div className="container mt-4">
      <h1 className="fw-bold">Report Found Item</h1>

      <form className="mt-4">

        <div className="mb-3">
          <label htmlFor="foundItemName" className="form-label">
            Item Name
            <input
              id="foundItemName"
              name="foundItemName"
              className="form-control"
            />
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="foundLocation" className="form-label">
            Location Found
            <input
              id="foundLocation"
              name="foundLocation"
              className="form-control"
            />
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="foundDate" className="form-label">
            Date Found
            <input
              id="foundDate"
              name="foundDate"
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
