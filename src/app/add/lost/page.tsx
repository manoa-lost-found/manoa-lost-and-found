export default function AddLostPage() {
  return (
    <div className="container mt-4">
      <h1 className="fw-bold">Report Lost Item</h1>

      <form className="mt-4">
        <div className="mb-3">
          <label htmlFor="itemName" className="form-label">
            Item Name
          </label>
          <input id="itemName" name="itemName" className="form-control" />
        </div>

        <div className="mb-3">
          <label htmlFor="locationLost" className="form-label">
            Location Lost
          </label>
          <input id="locationLost" name="locationLost" className="form-control" />
        </div>

        <div className="mb-3">
          <label htmlFor="dateLost" className="form-label">
            Date Lost
          </label>
          <input id="dateLost" name="dateLost" type="date" className="form-control" />
        </div>

        <button type="submit" className="btn btn-danger">
          Submit
        </button>
      </form>
    </div>
  );
}
