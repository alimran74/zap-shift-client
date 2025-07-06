import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const PendingDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch parcels assigned to rider, with isPaid true and status rider_assigned or in_transit
  const {
    data: parcels = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pendingParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders/email/${user.email}/pending-parcels`);
      return res.data.data;
    },
    enabled: !!user?.email,
  });

  // Mutation to update parcel status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ parcelId, newStatus }) => {
      const res = await axiosSecure.patch(`/parcels/${parcelId}/status`, {
        status: newStatus,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Status updated successfully");
      queryClient.invalidateQueries(["pendingParcels", user?.email]);
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });

  // Handle status update button click with confirmation dialog
  const handleStatusUpdate = (parcel) => {
    Swal.fire({
      title: "Are you sure?",
      text:
        parcel.status === "rider_assigned"
          ? "Mark this parcel as picked up (In Transit)?"
          : "Mark this parcel as delivered?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#6366F1",
    }).then((result) => {
      if (result.isConfirmed) {
        if (parcel.status === "rider_assigned") {
          updateStatusMutation.mutate({ parcelId: parcel._id, newStatus: "in_transit" });
        } else if (parcel.status === "in_transit") {
          updateStatusMutation.mutate({ parcelId: parcel._id, newStatus: "delivered" });
        }
      }
    });
  };

  if (isLoading) return <p>Loading parcels...</p>;
  if (isError) return <p>Error loading parcels: {error.message}</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Deliveries</h2>

      {parcels.length === 0 ? (
        <p>No pending parcels assigned.</p>
      ) : (
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-600 text-white">
              <th className="border px-4 py-2">Parcel ID</th>
              <th className="border px-4 py-2">Receiver</th>
              <th className="border px-4 py-2">Region</th>
              <th className="border px-4 py-2">Weight (kg)</th>
              <th className="border px-4 py-2">Cost</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Paid</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id} className="text-center border">
                <td className="border px-4 py-2">{parcel.parcelId}</td>
                <td className="border px-4 py-2">{parcel.receiverName}</td>
                <td className="border px-4 py-2">{parcel.receiverRegion}</td>
                <td className="border px-4 py-2">{parcel.weight}</td>
                <td className="border px-4 py-2">{parcel.cost || "N/A"}</td>
                <td className="border px-4 py-2 capitalize">{parcel.status.replace("_", " ")}</td>
                <td className="border px-4 py-2">{parcel.isPaid ? "Yes" : "No"}</td>
                <td className="border px-4 py-2">
                  {parcel.isPaid && (parcel.status === "rider_assigned" || parcel.status === "in_transit") ? (
                    <button
                      disabled={updateStatusMutation.isLoading}
                      onClick={() => handleStatusUpdate(parcel)}
                      className="btn btn-lg btn-primary"
                    >
                      {parcel.status === "rider_assigned" ? "Mark as Picked Up" : "Mark as Delivered"}
                    </button>
                  ) : (
                    <span className="text-gray-400">No Action</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingDeliveries;
