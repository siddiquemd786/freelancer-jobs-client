// src/pages/Register.jsx
import React, { useState, useContext } from "react";

import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";



const Register = () => {
  const { createUser, updateUserProfile, googleLogin } =useContext (AuthContext)
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  
  const validatePassword = (password) => {
    if (password.length < 6)
      return "Password must be at least 6 characters long.";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(password))
      return "Password must contain at least one lowercase letter.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const { name, email, photo, password } = form;
    const validationError = validatePassword(password);
    if (validationError) {
      setMessage({ type: "error", text: validationError });
      return;
    }

    setLoading(true);
    try {
      await createUser(email, password);
      await updateUserProfile(name, photo);

      setMessage({ type: "success", text: "Registration successful!" });
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

 
  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate("/");
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 mt-10 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        {/* 🔹 Title */}
        <h2 className="text-3xl font-semibold text-center  text-gray-800">
          Sign Up
        </h2>

       
        <form onSubmit={handleSubmit}>
         
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200 outline-none"
              required
            />
          </div>

          
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200 outline-none"
              required
            />
          </div>

         
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              Photo URL
            </label>
            <input
              type="text"
              name="photo"
              value={form.photo}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
              className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200 outline-none"
            />
          </div>

      
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200 outline-none"
              required
            />
          </div>

         
          {message.text && (
            <p
              className={`text-sm mb-3 ${
                message.type === "error" ? "text-red-600" : "text-green-600"
              }`}
            >
              {message.text}
            </p>
          )}

         
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
            } text-white rounded-lg py-2 font-semibold transition`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

      
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-2 text-sm text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full border border-gray-300 rounded-lg py-2 font-semibold flex justify-center items-center gap-2 hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

      
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
