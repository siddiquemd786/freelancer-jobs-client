// src/component/Navbar.jsx
import { Link, NavLink } from "react-router";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => console.log("User logged out"))
      .catch((err) => console.error(err));
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "All Jobs", path: "/alljobs" },
    { name: "Add a Job", path: "/add-job" },
    { name: "My Accepted Tasks", path: "/my-accepted-tasks" },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 shadow-lg bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-[#00C4FF] flex items-center gap-2">
          <img
            className="w-10 h-10 rounded-full"
            src="https://static.vecteezy.com/system/resources/previews/005/532/814/non_2x/creative-market-and-place-logo-modern-business-company-vector.jpg"
            alt="logo"
          />
          <span className="hidden sm:inline">JobPortal</span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium transition ${
                  isActive ? "text-[#00C4FF]" : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Right buttons: theme + user */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <img
                src={user.photoURL || "https://i.ibb.co/2y8zvCt/user.png"}
                alt="avatar"
                className="w-10 h-10 rounded-full border cursor-pointer"
              />
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <Link
                to="/login"
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-50 transition"
              >
                Signup
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <div className="md:hidden ml-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-200 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-white dark:bg-gray-900 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-4 py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium transition ${
                  isActive ? "text-[#00C4FF]" : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* Mobile login/register buttons if user not logged in */}
          {!user && (
            <div className="flex flex-col gap-2 mt-2">
              <Link
                to="/login"
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-center"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-50 transition text-center"
              >
                Signup
              </Link>
            </div>
          )}

          {/* Mobile logout + avatar if logged in */}
          {user && (
            <div className="flex items-center gap-2 mt-2">
              <img
                src={user.photoURL || "https://i.ibb.co/2y8zvCt/user.png"}
                alt="avatar"
                className="w-10 h-10 rounded-full border"
              />
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition flex-1"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
