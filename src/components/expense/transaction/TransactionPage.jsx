import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Transaction from "./Transaction";
import API from "@/utils/axios";
import getCurrentMonthDateParams from "@/utils/generateCurMonthDates";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const BACKEND = import.meta.env.VITE_BACKEND_URI;

const TransactionPage = () => {
  const [activeTab, setActiveTab] = useState("income");
  // const [loading,setLoading] = useState()
  const [transactions, setTransations] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [dateStart, dateEnd] = dateRange;

  const fetchAllTransactions = async () => {
    try {
      const startDate = format(dateStart, "yyyy-MM-dd");
      const endDate = format(dateEnd, "yyyy-MM-dd");
      const response = await API.get(`${BACKEND}/expenses/bulk`, {
        params: { startDate, endDate, allTnx: true },
      });
      const data = response.data;
      if (!data.expenses) {
        toast(data.message || "No transactions found!");
        setTransations([]);
        return;
      }
      setTransations(data.expenses);
    } catch (error) {
      console.error(error);
      toast.error(error.message || error.error || "Something went wrong");
    }
  };
  useEffect(() => {
    const { startDate, endDate } = getCurrentMonthDateParams();
    setDateRange([startDate, endDate]);
    // fetchAllTransactions();
  }, []);
  useEffect(() => {
    if (dateStart && dateEnd) {
      fetchAllTransactions();
    }
  }, [dateStart, dateEnd]);
  useEffect(() => {
    if (activeTab === "all") {
      setFilteredTransactions(transactions);
      return;
    }
    const filteredData = transactions?.filter(
      (txn) => txn.type.toLowerCase() === activeTab
    );
    setFilteredTransactions(filteredData);
  }, [activeTab, transactions]);

  return (
    <div className="w-full ">
      {/* Switch Control */}
      <div className="flex items-center justify-between bg-gray-200 p-1 rounded-md max-w-xs mx-auto">
        <button
          onClick={() => setActiveTab("income")}
          className={cn(
            "flex-1 text-sm px-4 py-1.5 rounded-md transition-all",
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
            "flex-1 text-sm px-4 py-1.5 rounded-md transition-all",
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
            "flex-1 text-sm px-4 py-1.5 rounded-md transition-all",
            activeTab === "all"
              ? "bg-white text-black shadow-sm"
              : "text-muted-foreground"
          )}
        >
          Both
        </button>
      </div>
      <DatePicker
        className="bg-blue-100 p-3 rounded-lg"
        placeholderText="Please Select the date.📆"
        selectsRange={true}
        startDate={dateStart}
        endDate={dateEnd}
        onChange={(update) => {
          setDateRange(update);
        }}
        isClearable={true}
        maxDate={new Date()}
      />

      {/* Section Content */}
      <div className="mt-4">
        {filteredTransactions?.length > 0 ? (
          <Transaction transactions={filteredTransactions} type={activeTab} />
        ) : (
          <div className="flex justify-center mt-10 tracking-wider shadow-sm rounded-lg py-6 shadow-red-400">
            No transaction found for given date range.
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionPage;
