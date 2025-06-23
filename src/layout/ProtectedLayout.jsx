import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

const ProtectedOutlet = () => {
  const { isChecking, isLoggedIn } = useAuthContext();

  if (isChecking) return <div>Loading...</div>;
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default ProtectedOutlet;
