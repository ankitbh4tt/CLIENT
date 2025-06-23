import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { Toaster } from "react-hot-toast";
import { useLoading } from "./context/loadingContext";
import { useEffect } from "react";
import { injectLoadingSetter } from "./utils/axios";
// eslint-disable-next-line no-shadow-restricted-names
import { Infinity } from "ldrs/react";
import "ldrs/react/Infinity.css";

function App() {
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    injectLoadingSetter(setLoading);
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      {/* Overlay loader */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-70 flex items-center justify-center">
          <Infinity
            size="55"
            stroke="4"
            strokeLength="0.15"
            bgOpacity="0.1"
            speed="1.3"
            color="black"
          />
        </div>
      )}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
