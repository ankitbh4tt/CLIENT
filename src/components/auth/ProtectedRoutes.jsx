import { useAuthContext } from "@/context/AuthContext";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { isLoggedIn, isChecking } = useAuthContext();
  if (isChecking) {
    return <div>Loading...</div>; // or a spinner
  }
  return isLoggedIn ? children : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
