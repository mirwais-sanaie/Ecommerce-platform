import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShopContext } from "../contexts/ShopContext";
import Title from "../components/Title";

function Signup() {
  const navigate = useNavigate();
  const { signup } = useShopContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    const result = signup(formData.name, formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-10 border-t">
      <div className="w-full max-w-md text-center">
        <Title text1="CREATE" text2="ACCOUNT" />
        <h1 className="text-2xl sm:text-3xl font-medium mb-8 prata-regular">
          Sign up for AfroMart
        </h1>
      </div>

      <div className="w-full max-w-md border border-gray-200 p-8 bg-gray-50/50">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 text-sm"
              placeholder="John Doe"
            />
          </div>
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
              minLength={6}
              className="w-full border border-gray-300 px-4 py-2 text-sm"
              placeholder="At least 6 characters"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Confirm Password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 text-sm"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 text-sm hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "SIGN UP"}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-500 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
