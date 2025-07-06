import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CompletedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch completed parcels for the rider
  const {
    data: parcels = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["completedParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders/email/${user.email}/completed-parcels`
      );
      return res.data.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p>Loading completed deliveries...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">✅ Completed Deliveries</h2>

      {parcels.length === 0 ? (
        <p>No completed deliveries found.</p>
      ) : (
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-green-100">
              <th className="border px-4 py-2">Parcel ID</th>
              <th className="border px-4 py-2">Receiver</th>
              <th className="border px-4 py-2">Region</th>
              <th className="border px-4 py-2">Weight (kg)</th>
              <th className="border px-4 py-2">Cost</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Paid</th>
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
                <td className="border px-4 py-2 capitalize text-green-700">
                  {parcel.status.replace("_", " ")}
                </td>
                <td className="border px-4 py-2">{parcel.isPaid ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CompletedDeliveries;
