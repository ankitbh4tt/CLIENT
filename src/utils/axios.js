import axios from "axios";
import toast from "react-hot-toast";

const API = axios.create({
  baseURL: import.meta.env.BACKEND_URI,
});

let setGlobalLoading = null;

export const injectLoadingSetter = (setLoadingFunc) => {
  setGlobalLoading = setLoadingFunc;
};

API.interceptors.request.use(
  (config) => {
    if (setGlobalLoading) setGlobalLoading(true);
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (setGlobalLoading) setGlobalLoading(false);
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    if (setGlobalLoading) setGlobalLoading(true);
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      toast.error("Unauthorized access!!");
      window.location.href = "/login";
    }
    if (setGlobalLoading) setGlobalLoading(false);
    toast.error(
      error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong!"
    );

    return Promise.reject(error);
  }
);
export default API;
