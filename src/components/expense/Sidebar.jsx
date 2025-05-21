import React from 'react'
import { Wallet, ArrowUpRight, ArrowDownRight, Home, TrendingUp, PieChart, Cog, Plus } from "lucide-react";

import {
  Card, CardHeader, CardTitle, CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Sidebar = () => {
  return (
      <aside className="w-64 hidden md:flex flex-col bg-white border-r">
        <div className="p-4 flex items-center space-x-2 border-b">
          <Wallet className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-bold">FinTracker</h1>
        </div>
        <div className="flex flex-col p-4 space-y-2">
          <Button variant="ghost" className="justify-start">
            <Home className="w-5 h-5 mr-2" /> Dashboard
          </Button>
          <Button variant="ghost" className="justify-start">
            <TrendingUp className="w-5 h-5 mr-2" /> Transactions
          </Button>
          <Button variant="ghost" className="justify-start">
            <PieChart className="w-5 h-5 mr-2" /> Analytics
          </Button>
          <Button variant="ghost" className="justify-start">
            <Cog className="w-5 h-5 mr-2" /> Settings
          </Button>
        </div>
      </aside>
  )
}

export default Sidebar
