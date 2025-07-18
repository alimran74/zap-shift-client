import React, { Children } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  

  if (loading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }
  if (!user) {
     return <Navigate state={{from: location.pathname}} to="/login" />;
  }

  return children;
};

export default PrivateRoute;
