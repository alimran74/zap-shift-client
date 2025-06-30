import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router'; // ✅ useNavigate added
import ProFastLogo from '../ProFastLogo/ProFastLogo';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      navigate("/"); // ✅ use navigate instead of Navigate()
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Something went wrong!");
    }
  };

  const navItems = (
    <>
      <li><NavLink to='/'>Home</NavLink></li>
      <li><NavLink to='/coverage'>Coverage</NavLink></li>
      <li><NavLink to='/sendParcel'>Send a Parcel</NavLink></li>
      {user && <li><NavLink to='/dashboard'>Dashboard</NavLink></li>}


      <li><NavLink to='/beARider'>Be a Rider</NavLink></li>
      <li><NavLink to='/about'>About Us</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <ProFastLogo />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      <div className="navbar-end space-x-3">
        {user ? (
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="avatar">
              <div className="w-8 rounded-full ring ring-indigo-400">
                <img
                  src={user.photoURL || "https://i.ibb.co/tYgCnrY/default-avatar.png"}
                  alt="User"
                />
              </div>
            </div>

            {/* User Name */}
            <span className="hidden md:inline text-sm font-medium text-gray-600">
              {user.displayName || "User"}
            </span>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn btn-sm btn-primary text-white hover:bg-indigo-600 transition"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
