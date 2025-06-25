import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"; // adjust path if needed
import { Home, TrendingUp, PieChart, Cog } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export function AppSidebarContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    {
      label: "Dashboard",
      icon: <Home className="w-4 h-4" />,
      path: "/home/dashboard",
    },
    {
      label: "Transactions",
      icon: <TrendingUp className="w-4 h-4" />,
      path: "/home/transactions",
    },
    {
      label: "Analytics",
      icon: <PieChart className="w-4 h-4" />,
      path: "/home/analytics",
    },
    {
      label: "Settings",
      icon: <Cog className="w-4 h-4" />,
      path: "/home/settings",
    },
  ];

  return (
    <SidebarContent>
      <SidebarMenu>
        {links.map((link) => (
          <SidebarMenuItem key={link.path}>
            <SidebarMenuButton
              onClick={() => navigate(link.path)}
              isActive={location.pathname === link.path}
            >
              {link.icon}
              <span>{link.label}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarContent>
  );
}
