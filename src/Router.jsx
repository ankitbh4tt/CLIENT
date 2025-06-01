import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import FinanceTrackerHome from "./pages/ExpensePage";
import NotFound from "./components/error/NotFound";

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
]);

export default router;
