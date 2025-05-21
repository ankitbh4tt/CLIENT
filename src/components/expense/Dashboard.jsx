import React from 'react'
import { Wallet, ArrowUpRight, ArrowDownRight, Home, TrendingUp, PieChart, Cog, Plus } from "lucide-react";
import {
  Card, CardHeader, CardTitle, CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Topbar from './Topbar';

const Dashboard = ({recentTransactions  }) => {
    return (
        <div className="flex-1 flex flex-col">
            {/* Top Bar */}
            <Topbar/>
            {/* Main */}
            <main className="p-4 space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-gray-500">Balance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$4,256.78</div>
                            <div className="text-sm text-green-500 flex items-center mt-1">
                                <ArrowUpRight className="w-4 h-4 mr-1" /> 8.2% from last month
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-gray-500">Income</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$3,125.00</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-gray-500">Expenses</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$1,843.29</div>
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
                            {recentTransactions.map((t) => (
                                <div key={t.id} className="flex justify-between items-center p-4 border-b last:border-none">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">
                                            <span>{t.icon}</span>
                                        </div>
                                        <div>
                                            <p className="font-medium">{t.name}</p>
                                            <p className="text-sm text-gray-500">{t.date} • {t.category}</p>
                                        </div>
                                    </div>
                                    <p className={`font-medium ${t.amount > 0 ? "text-green-500" : "text-red-500"}`}>
                                        {t.amount > 0 ? "+" : "-"}${Math.abs(t.amount).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}

export default Dashboard
