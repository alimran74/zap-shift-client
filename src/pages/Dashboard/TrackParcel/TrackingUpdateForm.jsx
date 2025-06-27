import React, { useState } from "react";
import useTrackUpdater from "../../../hooks/useTrackUpdater";

const TrackingUpdateForm = ({ parcelId }) => {
  const { addTrackingUpdate, loading } = useTrackUpdater();

  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!status || !location) {
      alert("Status and Location are required");
      return;
    }

    const success = await addTrackingUpdate({
      parcelId,
      status,
      location,
      note,
    });

    if (success) {
      setStatus("");
      setLocation("");
      setNote("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 space-y-4 max-w-xl mx-auto"
    >
      <h3 className="text-xl font-semibold text-indigo-700 mb-4">
        📍 Add Tracking Update
      </h3>

      <div>
        <label className="font-medium text-gray-700">Status</label>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="input input-bordered w-full"
          placeholder="e.g. Out for delivery"
          required
        />
      </div>

      <div>
        <label className="font-medium text-gray-700">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="input input-bordered w-full"
          placeholder="e.g. Khulna Warehouse"
          required
        />
      </div>

      <div>
        <label className="font-medium text-gray-700">Note (Optional)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="textarea textarea-bordered w-full"
          placeholder="Any special note..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full"
      >
        {loading ? "Updating..." : "Add Tracking Info"}
      </button>
    </form>
  );
};

export default TrackingUpdateForm;
