import React, { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/expense/Sidebar";
import Dashboard from "@/components/expense/Dashboard";
import toast from "react-hot-toast";
import API from "@/utils/axios";
import { useAuthContext } from "@/context/AuthContext";

export default function FinanceTrackerHome() {
  // Helper function
  const getCurrentMonthDateParams = () => {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .split("T")[0];
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      .toISOString()
      .split("T")[0];
    return { startDate, endDate };
  };
  const { user } = useAuthContext();
  const [dashboardData, setDashboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const hasFetched = useRef(false); // ✅ useRef instead of useState
  const BACKEND = import.meta.env.VITE_BACKEND_URI;

  useEffect(() => {
    if (hasFetched.current) return;

    const getDashboardData = async () => {
      setIsLoading(true);
      try {
        const { startDate, endDate } = getCurrentMonthDateParams();
        const res = await API.get(`${BACKEND}/expenses/bulk`, {
          params: { startDate, endDate },
        });
        setDashboardData(res.data);
        hasFetched.current = true; // ✅ update ref
      } catch (error) {
        console.error("API error:", error);
        toast.error(error.message || "Something went wrong.", {
          id: "expense-fetch-error",
        });
      } finally {
        setIsLoading(false);
      }
    };

    getDashboardData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {isLoading && <div>Loading expenses...</div>}
      <Sidebar />
      <Dashboard dashboardData={dashboardData} user={user} />
    </div>
  );
}
