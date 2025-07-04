import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AssignRiderModal from "./AssignModal";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const [parcels, setParcels] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axiosSecure
      .get("/parcels")
      .then((res) => {
        const filtered = res.data.filter(
          (parcel) => parcel.status === "Paid" && parcel.isPaid === true
        );
        setParcels(filtered);
      })
      .catch((err) => console.error(err));
  }, [axiosSecure]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Assign Rider</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Parcel ID</th>
              <th>Receiver</th>
              <th>Receiver Region</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, idx) => (
              <tr key={parcel._id}>
                <td>{idx + 1}</td>
                <td>{parcel.parcelId}</td>
                <td>{parcel.receiverName}</td>
                <td>{parcel.receiverRegion}</td>
                <td>{parcel.status}</td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedParcel(parcel);
                      setModalOpen(true);
                    }}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedParcel && (
        <AssignRiderModal
  isOpen={modalOpen}
  onRequestClose={() => setModalOpen(false)}
  parcel={selectedParcel}
/>

      )}
    </div>
  );
};

export default AssignRider;
