import React, { Children } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }
  if (!user) {
     return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
