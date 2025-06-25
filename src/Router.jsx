import { createBrowserRouter } from "react-router-dom";
import FinanceTrackerHome from "./pages/ExpensePage";
import NotFound from "./components/error/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedOutlet from "./layout/ProtectedLayout"; // 👈 Only outlet now

const router = createBrowserRouter([
  {
    path: "/home/dashboard",
    element: <ProtectedOutlet />,
    children: [
      {
        path: "",
        element: <FinanceTrackerHome />,
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
