import React from "react";
import { NavLink, Outlet } from "react-router";
import ProFastLogo from "../pages/Shared/ProFastLogo/ProFastLogo";
import { FaHistory, FaMapMarkerAlt, FaEdit } from "react-icons/fa";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none ">
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
        {/* Page content here */}
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
            <a>Home</a>
          </li>
          <li>
            <NavLink to="/dashboard/myParcels">📦My Parcels</NavLink>
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
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
