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
      return res.data.data;
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

    <div className="overflow-x-auto rounded-xl shadow-xl border border-gray-200">
  <table className="table w-full text-sm text-gray-800">
    <thead className="bg-indigo-600 text-white text-sm">
      <tr>
        <th className="py-3 px-4">#</th>
        <th className="py-3 px-4">Parcel ID</th>
        <th className="py-3 px-4">Title</th>
        <th className="py-3 px-4">Type</th>
        <th className="py-3 px-4">Status</th>
        <th className="py-3 px-4">Cost</th>
        <th className="py-3 px-4">Created</th>
        <th className="py-3 px-4 text-center">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {parcels.map((parcel, index) => (
        <tr
          key={parcel._id}
          className="bg-white hover:bg-gray-50 transition-colors"
        >
          <td className="py-2 px-4">{index + 1}</td>
          <td className="py-2 px-4 text-xs text-gray-600">
            {parcel.parcelId.slice(0, 10)}...
          </td>
          <td className="py-2 px-4">{parcel.title}</td>
          <td className="py-2 px-4">
            <span
              className={`px-2 py-1 rounded-full text-white text-xs font-medium ${
                parcel.type === "document" ? "bg-blue-500" : "bg-purple-500"
              }`}
            >
              {parcel.type}
            </span>
          </td>
          <td className="py-2 px-4">
            <span
              className={`px-2 py-1 rounded-full text-white text-xs font-medium ${
                parcel.isPaid ? "bg-green-600" : "bg-yellow-500"
              }`}
            >
              {parcel.isPaid ? "Paid" : "Pending"}
            </span>
          </td>
          <td className="py-2 px-4 text-green-700 font-semibold">
            ৳{parcel.cost}
          </td>
          <td className="py-2 px-4 text-xs text-gray-500">
            {parcel.creation_date_local}
            <br />
            <span className="text-[11px]">{parcel.creation_time_local}</span>
          </td>
          <td className="py-2 px-4">
            <div className="flex flex-wrap gap-1 justify-center">
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
              <button
                onClick={() => handlePay(parcel)}
                disabled={parcel.isPaid}
                className={`btn btn-xs text-white ${
                  parcel.isPaid
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-emerald-500 hover:bg-emerald-600"
                }`}
                title={parcel.isPaid ? "Already Paid" : "Pay Now"}
              >
                {parcel.isPaid ? "Paid" : "Pay Now"}
              </button>
            </div>
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
