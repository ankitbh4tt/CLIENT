import React from "react";
import { Wallet, ArrowUpRight, ArrowDownRight, Home, TrendingUp, PieChart, Cog, Plus } from "lucide-react";

import {
  Card, CardHeader, CardTitle, CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Sidebar from "@/components/expense/Sidebar";
import Dashboard from "@/components/expense/Dashboard";

export default function FinanceTrackerHome() {
  const recentTransactions = [
    { id: 1, name: "Grocery Shopping", amount: -85.45, date: "May 20", category: "Food", icon: "🛒" },
    { id: 2, name: "Salary Deposit", amount: 2500, date: "May 15", category: "Income", icon: "💼" },
    { id: 3, name: "Netflix Subscription", amount: -14.99, date: "May 10", category: "Entertainment", icon: "🎬" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar/>
      <Dashboard recentTransactions={recentTransactions}/>
    </div>
  );
}
