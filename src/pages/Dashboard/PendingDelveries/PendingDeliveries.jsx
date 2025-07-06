import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PendingDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pendingDeliveries", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders/email/${user.email}/pending-deliveries`);
      return res.data.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p>Loading pending deliveries...</p>;
  if (isError) return <p>Error loading deliveries: {error.message}</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Deliveries (Assigned & Paid)</h2>
      {parcels.length === 0 ? (
        <p>No pending deliveries.</p>
      ) : (
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Parcel ID</th>
              <th className="border px-4 py-2">Receiver</th>
              <th className="border px-4 py-2">Region</th>
              <th className="border px-4 py-2">Cost</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id} className="text-center border">
                <td className="border px-4 py-2">{parcel.parcelId}</td>
                <td className="border px-4 py-2">{parcel.receiverName}</td>
                <td className="border px-4 py-2">{parcel.receiverRegion}</td>
                <td className="border px-4 py-2">৳{parcel.cost}</td>
                <td className="border px-4 py-2 capitalize">{parcel.status.replace("_", " ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingDeliveries;
