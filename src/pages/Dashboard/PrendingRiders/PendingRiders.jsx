import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedRider, setSelectedRider] = useState(null);

  // Fetch pending riders using react-query
  const { data: riders = [],refetch, isLoading } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data.data;
    },
  });

  // Mutation for updating rider status
  const mutation = useMutation({
    mutationFn: async ({ id, status }) => {
      return axiosSecure.patch(`/riders/${id}`, { status });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["pendingRiders"]);
      setSelectedRider(null);
      Swal.fire("Success", `Rider ${variables.status}`, "success");
    },
    onError: () => {
      Swal.fire("Error", "Something went wrong", "error");
    },
  });

  const handleStatusUpdate = (id, status) => {
    mutation.mutate({ id, status },
        {
    onSuccess: () => {
      refetch(); // ✅ manually refetch after status update
      toast.success("Status updated successfully");
    },
  }
    );
  };

  if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-black">⏳ Pending Rider Applications</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Region</th>
              <th>District</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No pending applications</td>
              </tr>
            ) : (
              riders.map((rider) => (
                <tr key={rider._id}>
                  <td>{rider.name}</td>
                  <td>{rider.email}</td>
                  <td>{rider.region}</td>
                  <td>{rider.district}</td>
                  <td>{rider.phone}</td>
                  <td className="space-x-1">
                    <button
                      className="btn btn-xs btn-info"
                      onClick={() => setSelectedRider(rider)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() => handleStatusUpdate(rider._id, "approved")}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleStatusUpdate(rider._id, "rejected")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedRider && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setSelectedRider(null)}
              className="absolute top-2 right-2 text-xl font-bold"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold mb-4 text-black">Rider Details</h3>
            <div className="space-y-2 text-black text-sm">
              <p><strong>Name:</strong> {selectedRider.name}</p>
              <p><strong>Email:</strong> {selectedRider.email}</p>
              <p><strong>Age:</strong> {selectedRider.age}</p>
              <p><strong>Region:</strong> {selectedRider.region}</p>
              <p><strong>District:</strong> {selectedRider.district}</p>
              <p><strong>Phone:</strong> {selectedRider.phone}</p>
              <p><strong>NID:</strong> {selectedRider.nationalId}</p>
              <p><strong>Bike Brand:</strong> {selectedRider.bikeBrand}</p>
              <p><strong>Bike Reg. Number:</strong> {selectedRider.bikeRegNumber}</p>
              <p><strong>Status:</strong> {selectedRider.status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRiders;
