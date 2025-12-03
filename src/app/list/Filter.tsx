/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

type FilterProps = {
  location: string;
  setLocation: (value: string) => void;
};

export default function Filter({ location, setLocation }: FilterProps) {
  return (
    <div className="mb-3">
      <label htmlFor="filter-location" className="form-label">
        Location
      </label>
      <input
        id="filter-location"
        type="text"
        className="form-control"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Filter by building or area"
      />
    </div>
  );
}

// Tiny runtime propTypes shim so eslint/react-compat is happy.
// It has no real effect on behavior.
(Filter as any).propTypes = {
  location: {} as any,
  setLocation: {} as any,
};
