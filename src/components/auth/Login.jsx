import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { userLoginSchema } from "@/validation/authValidator";
import API from "@/utils/axios";
import toast from "react-hot-toast";

// BACKEND URL
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userLoginSchema),
  });
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      console.log(formData);
      const response = await API.post(`${BACKEND_URI}/user/login`, formData);
      const { data } = response;
      if (data) {
        console.log(data);
        toast.success(data?.message);
        const token = data.token;
        localStorage.setItem("token", token);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter your email and password to log in.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit(handleLogin)}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
              <input
                {...register("email")}
                placeholder="johndoe@mail.com"
                autoComplete="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </label>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
              <input
                {...register("password")}
                placeholder="******"
                autoComplete="current-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold shadow-md transition"
          >
            Login
          </button>
        </form>

        {/* Sign-up Link */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
