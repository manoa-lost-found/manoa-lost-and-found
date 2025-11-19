export default function AddFoundPage() {
  return (
    <div className="container mt-4">
      <h1 className="fw-bold">Report Found Item</h1>

      <form className="mt-4">
        <div className="mb-3">
          <label htmlFor="itemName" className="form-label">
            Item Name
          </label>
          <input id="itemName" name="itemName" className="form-control" />
        </div>

        <div className="mb-3">
          <label htmlFor="locationFound" className="form-label">
            Location Found
          </label>
          <input id="locationFound" name="locationFound" className="form-control" />
        </div>

        <div className="mb-3">
          <label htmlFor="dateFound" className="form-label">
            Date Found
          </label>
          <input id="dateFound" name="dateFound" type="date" className="form-control" />
        </div>

        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
}
