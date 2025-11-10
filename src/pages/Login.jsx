// src/pages/Login.jsx
import React, { useState, useContext } from "react";



import { FaEye, FaEyeSlash } from "react-icons/fa";

import { AuthContext } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { loginUser, resetPassword, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please fill all fields!");
      return;
    }

    setLoading(true);
    try {
      await loginUser(form.email, form.password);
      toast.success("Login successful!");
      navigate(redirectPath);
    } catch {
      toast.error("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!form.email) {
      toast.error("Enter email first!");
      return;
    }

    try {
      await resetPassword(form.email);
      toast.success("Password reset mail sent!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleLogin();
      toast.success("Logged in with Google!");
      navigate(redirectPath);
    } catch {
      toast.error("Google login failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  mt-8 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border">

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit}>

         
          <div className="mb-4">
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="input input-bordered w-full"
            />
          </div>

        
          <div className="mb-4">
            <label className="block font-semibold mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input input-bordered w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-600"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

        
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

         
          <button
            type="submit"
            disabled={loading}
            className="w-full btn btn-primary font-semibold"
          >
            {loading ? "Loading..." : "Login"}
          </button>

      
          <div className="divider">OR</div>
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="btn btn-outline w-full flex items-center gap-2"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>

        
          <p className="text-center text-gray-500 mt-4">
            New here?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Create an account
            </Link>
          </p>
        </form>

      </div>
    </div>
  );
};

export default Login;
