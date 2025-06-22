import "./App.css";
import Todos from "./components/Todos";
import { Route, RouterProvider, Routes } from "react-router-dom";
import ExpensePage from "./pages/ExpensePage";
import router from "./Router";
import { Toaster } from "react-hot-toast";
import LoadingProvider, { useLoading } from "./context/loadingContext";
import { useEffect } from "react";
import { injectLoadingSetter } from "./utils/axios";

function App() {
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    injectLoadingSetter(setLoading);
  }, [setLoading]);
  return (
    <>
      {loading && <p>Loading...</p>}
      <>
        <Toaster position="top-right" />
        <LoadingProvider>
          <RouterProvider router={router} />
        </LoadingProvider>
      </>
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
