import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegisterSchema } from "@/validation/authValidator";
import API from "@/utils/axios";
import toast from "react-hot-toast";

export default function Register() {
  const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userRegisterSchema),
  });
  const navigate = useNavigate();
  const handleRegister = async (formData) => {
    try {
      console.log(formData);
      const response = await API.post(`${BACKEND_URI}/user/register`, formData);
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
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-sm text-gray-500 mt-1">
            Please fill in the form to register
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit(handleRegister)}>
          {/* User Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User Name
              <input
                {...register("username")}
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </label>
          </div>

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
                <p className="text-red-500">{errors.email.message}</p>
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
                autoComplete="new-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </label>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
              <input
                {...register("password")}
                placeholder="******"
                autoComplete="new-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold shadow-md transition"
          >
            Register
          </button>
        </form>

        {/* Link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
