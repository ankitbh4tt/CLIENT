import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import FinanceTrackerHome from "./pages/ExpensePage";
import NotFound from "./components/error/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <FinanceTrackerHome />
      </ProtectedRoutes>
    ),
    children: [],
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export default router;
