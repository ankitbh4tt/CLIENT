import React, { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Topbar from "./Topbar";
import API from "@/utils/axios";
import toast from "react-hot-toast";
import { useAuthContext } from "@/context/AuthContext";
import getCurrentMonthDateParams from "@/utils/generateCurMonthDates";

const categoryIcons = {
  FOOD: "🍔",
  ENTERTAINMENT: "🎮",
  TRANSPORT: "🚗",
  SHOPPING: "🛍️",
  BILLS: "🧾",
  OTHER: "📦",
  INCOME: "💸",
};
const RUPEE_SIGN = "₹";
const BACKEND = import.meta.env.VITE_BACKEND_URI;

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const hasFetched = useRef(false); // ✅ useRef instead of useState
  const { user } = useAuthContext();
  const { expenses, expenseSummary } = dashboardData;

  useEffect(() => {
    if (hasFetched.current) return;

    const getDashboardData = async () => {
      try {
        const { startDate, endDate } = getCurrentMonthDateParams();
        const res = await API.get(`${BACKEND}/expenses/bulk`, {
          params: { startDate, endDate, dashboard: true },
        });
        setDashboardData(res.data);
        hasFetched.current = true; // ✅ update ref
      } catch (error) {
        console.error("API error:", error);
        toast.error(error.message || "Something went wrong.", {
          id: "expense-fetch-error",
        });
      }
    };

    getDashboardData();
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      {/* Top Bar */}
      <Topbar username={user.username || ""} />
      {/* Main */}
      <main className="p-4 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-500">Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {RUPEE_SIGN} {expenseSummary?.balanceTotal || 0}
              </div>
              {/* <div className="text-sm text-green-500 flex items-center mt-1">
                <ArrowUpRight className="w-4 h-4 mr-1" /> 8.2% from last month
              </div> */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-500">Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {RUPEE_SIGN} {expenseSummary?.totalIncome || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-500">Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {RUPEE_SIGN} {expenseSummary?.totalExpenses || 0} {}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="transactions">
          <TabsList className="mb-4">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Recent Transactions</h3>
              <Button>
                <Plus className="w-4 h-4 mr-2" /> Add
              </Button>
            </div>

            <div className="bg-white rounded-lg border">
              {expenses?.map((t) => (
                <div
                  key={t._id}
                  className="flex justify-between items-center p-4 border-b last:border-none"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">
                      <span>
                        {t.type?.toLowerCase() === "income"
                          ? "💸"
                          : categoryIcons[t.category]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{t.title}</p>
                      <p className="text-sm text-gray-500">
                        {t.createdAt} • {t.category || t.source}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`font-medium ${
                      t.type?.toLowerCase() === "income"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {t.type?.toLowerCase() === "income" ? "+" : "-"}
                    {RUPEE_SIGN}
                    {Math.abs(t.amount).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
