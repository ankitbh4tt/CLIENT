import React from "react";
import { NavLink } from "react-router-dom";
import { Wallet, Home, TrendingUp, PieChart, Cog } from "lucide-react";

const navItems = [
  {
    to: "/home/dashboard",
    icon: <Home className="w-5 h-5 mr-2" />,
    label: "Dashboard",
  },
  {
    to: "/home/transactions",
    icon: <TrendingUp className="w-5 h-5 mr-2" />,
    label: "Transactions",
  },
  {
    to: "/home/analytics",
    icon: <PieChart className="w-5 h-5 mr-2" />,
    label: "Analytics",
  },
  {
    to: "/home/settings",
    icon: <Cog className="w-5 h-5 mr-2" />,
    label: "Settings",
  },
];

const Sidebar = () => {
  return (
    <aside className="w-64 hidden md:flex flex-col bg-white border-r">
      {/* Logo */}
      <div className="p-4 flex items-center space-x-2 border-b">
        <Wallet className="w-6 h-6 text-blue-600" />
        <h1 className="text-xl font-bold">FinTracker</h1>
      </div>

      {/* Nav Items */}
      <div className="flex flex-col p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
