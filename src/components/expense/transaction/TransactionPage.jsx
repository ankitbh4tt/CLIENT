import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Transaction from "./Transaction";
import API from "@/utils/axios";
import getCurrentMonthDateParams from "@/utils/generateCurMonthDates";

const BACKEND = import.meta.env.VITE_BACKEND_URI;

const TransactionPage = () => {
  const [activeTab, setActiveTab] = useState("income");
  // const [loading,setLoading] = useState()
  const [transactions, setTransations] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const fetchAllTransactions = async () => {
    try {
      const { startDate, endDate } = getCurrentMonthDateParams();
      const response = await API.get(`${BACKEND}/expenses/bulk`, {
        params: { startDate, endDate, allTnx: true },
      });
      const data = response.data;
      if (!data) {
        toast("No transactions found!");
        return;
      }
      setTransations(data.expenses);
    } catch (error) {
      console.error(error);
      toast.error(error.message || error.error || "Something went wrong");
    }
  };
  useEffect(() => {
    fetchAllTransactions();
  }, []);

  useEffect(() => {
    if (activeTab === "all") {
      setFilteredTransactions(transactions);
      return;
    }
    const filteredData = transactions.filter(
      (txn) => txn.type.toLowerCase() === activeTab
    );
    setFilteredTransactions(filteredData);
  }, [activeTab, transactions]);

  return (
    <div className="w-full ">
      {/* Switch Control */}
      <div className="flex items-center justify-between bg-muted p-1 rounded-full max-w-xs mx-auto">
        <button
          onClick={() => setActiveTab("income")}
          className={cn(
            "flex-1 text-sm px-4 py-1.5 rounded-full transition-all",
            activeTab === "income"
              ? "bg-white text-black shadow-sm"
              : "text-muted-foreground"
          )}
        >
          Income
        </button>
        <button
          onClick={() => setActiveTab("expense")}
          className={cn(
            "flex-1 text-sm px-4 py-1.5 rounded-full transition-all",
            activeTab === "expense"
              ? "bg-white text-black shadow-sm"
              : "text-muted-foreground"
          )}
        >
          Expenses
        </button>
        <button
          onClick={() => setActiveTab("all")}
          className={cn(
            "flex-1 text-sm px-4 py-1.5 rounded-full transition-all",
            activeTab === "all"
              ? "bg-white text-black shadow-sm"
              : "text-muted-foreground"
          )}
        >
          Both
        </button>
      </div>

      {/* Section Content */}
      <div className="mt-4">
        <Transaction transactions={filteredTransactions} type={activeTab} />
      </div>
    </div>
  );
};

export default TransactionPage;
