import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchText.trim()) {
      return Swal.fire("Warning", "Please enter a name or email", "warning");
    }

    try {
      const res = await axiosSecure.get(`/users/search?keyword=${searchText}`);
      if (res.data.success && res.data.users) {
        setUsers(res.data.users);
      } else {
        Swal.fire("Not Found", "No users matched your search", "info");
        setUsers([]);
      }
    } catch (err) {
      console.error("❌ Search error:", err);
      Swal.fire("Error", "Search failed", "error");
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      const res = await axiosSecure.patch(`/users/${id}/role`, {
        role: newRole,
      });
      if (res.data.success) {
        Swal.fire("Success", res.data.message, "success");
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === id ? { ...user, role: newRole } : user
          )
        );
      } else {
        Swal.fire("Info", res.data.message, "info");
      }
    } catch (err) {
      console.error("❌ Role update error:", err);
      Swal.fire("Error", "Failed to update user role", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-black">
        🔐 Make / Remove Admin
      </h2>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {users.length > 0 && (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-100 p-4 rounded text-sm text-black border"
            >
              <p>
                <strong>Name:</strong> {user.name || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Role:</strong>{" "}
                <span
                  className={
                    user.role === "admin" ? "text-green-600 font-medium" : ""
                  }
                >
                  {user.role || "user"}
                </span>
              </p>
              <p>
  <strong>Joined:</strong>{" "}
  {(user.created_at || user.createdAt)
    ? new Date(user.created_at || user.createdAt).toLocaleString()
    : "N/A"}
</p>

              <div className="mt-3 flex gap-2">
                {user.role === "admin" ? (
                  <button
                    onClick={() => handleRoleChange(user._id, "user")}
                    className="btn btn-error btn-sm"
                  >
                    ❌ Remove Admin
                  </button>
                ) : (
                  <button
                    onClick={() => handleRoleChange(user._id, "admin")}
                    className="btn btn-success btn-sm"
                  >
                    ✅ Make Admin
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {users.length === 0 && (
        <p className="text-center text-sm text-gray-500">No users found</p>
      )}
    </div>
  );
};

export default MakeAdmin;
