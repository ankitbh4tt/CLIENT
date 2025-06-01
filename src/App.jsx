import "./App.css";
import Todos from "./components/Todos";
import { Route, RouterProvider, Routes } from "react-router-dom";
import ExpensePage from "./pages/ExpensePage";
import router from "./Router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
    // <div className="bg-red-200 min-h-screen">
    //   {/* <Todos/> */}
    //   <Routes>
    //     <Route path="/todos" element={<Todos />} />
    //     <Route path="/expense" element={<ExpensePage />}></Route>
    //     <Route path="*" element={<ExpensePage />} />
    //   </Routes>
    // </div>
  );
}

export default App;
