// src/component/Navbar.jsx
import { Link, NavLink } from "react-router";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";





export default function Navbar() {

   const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => console.log("User logged out"))
      .catch((err) => console.error(err));
  };
  const navItems = [
    { name: "Home", path: "/" },
    { name: "All Jobs", path: "/alljobs" },
    { name: "Add a Job", path: "/addjob" },
    { name: "My Accepted Tasks", path: "/my-accepted-tasks" },
  ];

  return (
    <nav className="bg-gradient-to-r from-[#030B18] to-[#081C34] shadow-lg sticky top-0 z-50 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-[#00C4FF]">
          aiNexa
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center bg-[#0B223D]/80 rounded-full px-6 py-2 shadow-inner">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium transition ${
                  isActive ? "text-[#00C4FF]" : "text-gray-300 hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Login/Register Button */}
            <div className="flex justify-end items-center gap-4">
         
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

        
          <div className="hidden md:flex md:items-center gap-4">
            {user ? (
              <>
                <div className="relative group">
                  <img
                    src={user.photoURL || "https://i.ibb.co/2y8zvCt/user.png"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full border cursor-pointer"
                  />
                  <span className="absolute left-1/2 -translate-x-1/2 top-12 bg-gray-800 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {user.displayName || "User"}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-50 transition"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
     
    </nav>
  );
}
