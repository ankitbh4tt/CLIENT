import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const isAuthenticated = null;
  return isAuthenticated ? children : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
