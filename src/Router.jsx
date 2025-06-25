import { createBrowserRouter } from "react-router-dom";
import NotFound from "./components/error/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedOutlet from "./layout/ProtectedLayout"; // 👈 Only outlet now
import SidebarLayout from "./layout/SidebarLayout";
import Dashboard from "./components/expense/Dashboard";
import TransactionPage from "./components/expense/transaction/TransactionPage";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <ProtectedOutlet />,
    children: [
      {
        path: "",
        element: <SidebarLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "transactions",
            element: <TransactionPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
