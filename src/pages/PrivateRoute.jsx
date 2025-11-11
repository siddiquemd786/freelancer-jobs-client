// src/pages/PrivateRoute.jsx
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
};

export default PrivateRoute;
