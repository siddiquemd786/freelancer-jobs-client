// src/context/ThemeProvider.jsx
import {  useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";



export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // get theme from localStorage or default to 'light'
    return localStorage.getItem("theme") || "light";
  });

  // update HTML tag class when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme(theme === "light" ? "dark" : "light");

  return (

    <ThemeContext value={{ theme, toggleTheme }} >
      {children}

    </ThemeContext>
    
  );
};
