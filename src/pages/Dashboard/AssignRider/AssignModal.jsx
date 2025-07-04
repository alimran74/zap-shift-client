// AssignModal.jsx
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

Modal.setAppElement("#root");

const AssignModal = ({ isOpen, onRequestClose, receiverCenter }) => {
  const axiosSecure = useAxiosSecure();
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!receiverCenter || !isOpen) return;

    const fetchRiders = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await axiosSecure.get(`/riders/by-district?district=${receiverCenter}`);
        setRiders(res.data.data); // ✅ Check that data structure matches
      } catch (err) {
        console.error("❌ Error loading riders:", err);
        setError("No rider found in the district.");
      } finally {
        setLoading(false);
      }
    };

    fetchRiders();
  }, [receiverCenter, isOpen, axiosSecure]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="bg-white p-6 rounded shadow-xl max-w-lg mx-auto mt-32">
      <h2 className="text-xl mr-12 font-semibold mb-4">Assign Rider (District: {receiverCenter})</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && riders.length === 0 && (
        <p>No riders found for this district.</p>
      )}

      <ul className="space-y-2">
        {riders.map((rider) => (
          <li key={rider._id} className="border p-3 rounded shadow-sm">
            <p><strong>Name:</strong> {rider.name}</p>
            <p><strong>Phone:</strong> {rider.phone}</p>
            <p><strong>Bike:</strong> {rider.bikeBrand} - {rider.bikeRegNumber}</p>
            <button className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
              Assign This Rider
            </button>
          </li>
        ))}
      </ul>

      <button onClick={onRequestClose} className="mt-4 px-4 py-2 bg-red-300 rounded hover:bg-gray-400">
        Close
      </button>
    </Modal>
  );
};

export default AssignModal;
