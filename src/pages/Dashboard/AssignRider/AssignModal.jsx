import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const AssignModal = ({ isOpen, onRequestClose, parcel }) => {
  const axiosSecure = useAxiosSecure();
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const receiverRegion = parcel?.receiverRegion;

  useEffect(() => {
    if (!receiverRegion || !isOpen) return;

    const fetchRiders = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axiosSecure.get(`/riders/by-region?region=${receiverRegion}`);
        setRiders(res.data?.data || []);
      } catch (err) {
        console.error("❌ Error loading riders:", err);
        setError("No rider found in the region.");
      } finally {
        setLoading(false);
      }
    };

    fetchRiders();
  }, [receiverRegion, isOpen, axiosSecure]);

  const handleAssignRider = async (rider) => {
    try {
      const res = await axiosSecure.patch(`/parcels/assign-rider/${parcel.parcelId}`, {
        rider: {
          _id: rider._id,
          name: rider.name,
          phone: rider.phone,
          email: rider.email,
          region: rider.region,
          district: rider.district,
        },
      });

      if (res.data?.success) {
        toast.success(`✅ Rider "${rider.name}" assigned!`);
        onRequestClose();
      } else {
        toast.error("❌ Failed to assign rider.");
      }
    } catch (error) {
      console.error("❌ Error assigning rider:", error);
      toast.error("Server error occurred.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white text-black max-w-2xl mx-auto mt-24 p-6 rounded-lg shadow-lg border z-[9999] overflow-y-auto max-h-[80vh]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
    >
      <h2 className="text-2xl font-semibold mb-4">
        Assign Rider (Region: {receiverRegion})
      </h2>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && riders.length === 0 && (
        <p className="text-gray-700">No riders found for this region.</p>
      )}

      <ul className="space-y-3 max-h-[55vh] overflow-y-auto pr-2">
        {riders.map((rider) => (
          <li key={rider._id} className="border p-3 rounded shadow-sm bg-gray-100">
            <p><strong>Name:</strong> {rider.name}</p>
            <p><strong>Phone:</strong> {rider.phone}</p>
            <p><strong>Bike:</strong> {rider.bikeBrand} - {rider.bikeRegNumber}</p>
            <button
              onClick={() => handleAssignRider(rider)}
              className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Assign This Rider
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={onRequestClose}
        className="mt-6 px-5 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Close
      </button>
    </Modal>
  );
};

export default AssignModal;
