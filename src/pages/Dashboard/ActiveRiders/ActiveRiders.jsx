import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch active riders
  const { data: riders = [], isLoading } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data.data || [];
    },
  });

  // Mutation for deactivating rider
  const mutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/riders/${id}`, { status: "inactive" });
    },
    onSuccess: () => {
      Swal.fire("Success", "Rider deactivated", "success");
      queryClient.invalidateQueries(["activeRiders"]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to deactivate", "error");
    },
  });

  // Filtered data
  const filteredRiders = riders.filter((rider) =>
    rider.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-black">🚴 Active Riders</h2>

      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input input-bordered w-full mb-4"
      />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Region</th>
                <th>District</th>
                <th>Phone</th>
                <th>Bike</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRiders.length > 0 ? (
                filteredRiders.map((rider) => (
                  <tr key={rider._id}>
                    <td>{rider.name}</td>
                    <td>{rider.email}</td>
                    <td>{rider.region}</td>
                    <td>{rider.district}</td>
                    <td>{rider.phone}</td>
                    <td>{rider.bikeBrand}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => mutation.mutate(rider._id)}
                      >
                        Deactivate
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-red-600">
                    No matching riders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActiveRiders;
