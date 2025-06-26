import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/parcels?email=${user?.email}`);
      return res.data.data; // ✅ Important: returns array only
    },
    enabled: !!user?.email,
  });

  const handleView = (parcel) => {
    Swal.fire({
      title: `📦 Parcel Details`,
      html: `
        <div style="text-align: left;">
          <p><strong>Parcel ID:</strong> ${parcel.parcelId}</p>
          <p><strong>Title:</strong> ${parcel.title}</p>
          <p><strong>Type:</strong> ${parcel.type}</p>
          <p><strong>Weight:</strong> ${parcel.weight || "-"} kg</p>
          <p><strong>Status:</strong> ${parcel.status}</p>
          <p><strong>Cost:</strong> ৳${parcel.cost}</p>
          <p><strong>Created:</strong> ${parcel.creation_date_local} at ${parcel.creation_time_local}</p>
          <hr/>
          <p><strong>Sender:</strong> ${parcel.senderName} (${parcel.senderContact})</p>
          <p><strong>From:</strong> ${parcel.senderRegion}, ${parcel.senderCenter}</p>
          <p><strong>Address:</strong> ${parcel.senderAddress}</p>
          <p><strong>Instruction:</strong> ${parcel.senderInstruction || "N/A"}</p>
          <hr/>
          <p><strong>Receiver:</strong> ${parcel.receiverName} (${parcel.receiverContact})</p>
          <p><strong>To:</strong> ${parcel.receiverRegion}, ${parcel.receiverCenter}</p>
          <p><strong>Address:</strong> ${parcel.receiverAddress}</p>
          <p><strong>Instruction:</strong> ${parcel.receiverInstruction || "N/A"}</p>
        </div>
      `,
      icon: "info",
      confirmButtonText: "Close",
      confirmButtonColor: "#6366F1",
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this parcel!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/parcels/${id}`);
        Swal.fire("Deleted!", "Your parcel has been deleted.", "success");
        refetch();
      }
    });
  };

  const handlePay = (parcel) => {
    navigate(`/dashboard/payment/${parcel._id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <span className="loading loading-bars text-indigo-600"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">
        📦 My Parcels
      </h2>

      <div className="overflow-x-auto bg-white text-gray-800 rounded-xl shadow-xl border border-gray-200">
        <table className="table w-full table-zebra">
          <thead className="bg-indigo-600 text-white text-sm">
            <tr>
              <th>#</th>
              <th>Parcel ID</th>
              <th>Title</th>
              <th>Type</th>
              <th>Status</th>
              <th>Cost</th>
              <th>Created</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel.parcelId} className="hover:bg-indigo-50 transition">
                <td>{index + 1}</td>
                <td className="text-xs text-gray-600">
                  {parcel.parcelId.slice(0, 10)}...
                </td>
                <td>{parcel.title}</td>
                <td>
                  <span className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${parcel.type === "document" ? "bg-blue-500" : "bg-purple-500"}`}>
                    {parcel.type}
                  </span>
                </td>
                <td>
                  <span className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${parcel.status === "Pending" ? "bg-yellow-500" : "bg-green-600"}`}>
                    {parcel.status}
                  </span>
                </td>
                <td className="text-green-600 font-semibold">৳{parcel.cost}</td>
                <td className="text-xs text-gray-500 leading-tight">
                  {parcel.creation_date_local}
                  <br />
                  <span className="text-[11px]">{parcel.creation_time_local}</span>
                </td>
                <td className="flex flex-wrap gap-1 justify-center">
                  <button
                    onClick={() => handleView(parcel)}
                    className="btn btn-xs bg-blue-600 hover:bg-blue-700 text-white"
                    title="View"
                  >
                    <FaEye size={12} />
                  </button>
                  <button
                    className="btn btn-xs bg-yellow-500 hover:bg-yellow-600 text-white"
                    title="Edit"
                  >
                    <FaEdit size={12} />
                  </button>
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-xs bg-red-600 hover:bg-red-700 text-white"
                    title="Delete"
                  >
                    <FaTrash size={12} />
                  </button>
                  {!parcel.isPaid && (
                    <button
                      onClick={() => handlePay(parcel)}
                      className="btn btn-xs bg-emerald-500 hover:bg-emerald-600 text-white"
                      title="Pay Now"
                    >
                      Pay Now
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
