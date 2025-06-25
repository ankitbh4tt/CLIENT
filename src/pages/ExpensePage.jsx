import React from "react";
import Dashboard from "@/components/expense/Dashboard";
import Sidebar from "@/components/expense/Sidebar";

export default function FinanceTrackerHome() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <Dashboard />
    </div>
  );
}
