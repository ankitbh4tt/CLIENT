import API from "@/utils/axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  const checkSession = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not logged in!");
      setIsChecking(false);
      return;
    }
    try {
      const response = await API.get(
        `${import.meta.env.VITE_BACKEND_URI}/user/check-session`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data?.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      toast.error("Please log in again!");
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkSession(); // Run on mount
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isChecking,
        checkSession,
        setIsLoggedIn,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
