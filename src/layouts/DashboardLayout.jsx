import React from "react";
import { NavLink, Outlet } from "react-router";
import ProFastLogo from "../pages/Shared/ProFastLogo/ProFastLogo";
import {
  FaHistory,
  FaMapMarkerAlt,
  FaEdit,
  FaMotorcycle,
  FaClock,
  FaUserShield,
  FaTruckLoading,
  FaTasks,
  FaCheckCircle,
} from "react-icons/fa";
import useUserRole from "../hooks/useUserRole";

const DashboardLayout = () => {
  const { role, roleLoading: loading, error } = useUserRole();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        Failed to load user role.
      </div>
    );
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
        </div>

        {/* Page content here */}
        <Outlet />
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <ProFastLogo />

          <li>
            <NavLink to="/">🏠Home</NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/myParcels">📦 My Parcels</NavLink>
            <NavLink
              to="/dashboard/paymentHistory"
              className="flex items-center gap-1"
            >
              <FaHistory />
              Payment History
            </NavLink>
            <NavLink to="/dashboard/track" className="flex items-center gap-2">
              <FaMapMarkerAlt />
              Track a Package
            </NavLink>
            <NavLink
              to="/dashboard/profile"
              className="flex items-center gap-2"
            >
              <FaEdit />
              Update Profile
            </NavLink>
          </li>
          {/* rider only link */}
          {!loading && role === "rider" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/pendingDeliveries"
                  className="flex items-center gap-2"
                >
                  <FaTasks />
                  Pending Deliveries
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/completedDeliveries"
                  className="flex items-center gap-2"
                >
                  <FaCheckCircle />
                  Completed Deliveries
                </NavLink>
              </li>
            </>
          )}

          {/* Admin-only links */}
          {role === "admin" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/activeRiders"
                  className="flex items-center gap-2"
                >
                  <FaMotorcycle />
                  Active Riders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/pendingRiders"
                  className="flex items-center gap-2"
                >
                  <FaClock />
                  Pending Riders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/assignRider"
                  className="flex items-center gap-2"
                >
                  <FaTruckLoading />
                  Assign Rider
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/makeAdmin"
                  className="flex items-center gap-2"
                >
                  <FaUserShield />
                  Make Admin
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
