import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { useAuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate("/");
    } else {
      toast.error(result.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-10 border-t">
      <div className="w-full max-w-md text-center">
        <Title text1="WELCOME" text2="BACK" />
        <h1 className="text-2xl sm:text-3xl font-medium mb-8 prata-regular">
          Login to your account
        </h1>
      </div>

      <div className="w-full max-w-md border border-gray-200 p-8 bg-gray-50/50">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 text-sm"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 text-sm"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-3 text-sm hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "LOGIN"}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-500 text-center">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-black font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
