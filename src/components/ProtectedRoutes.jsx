import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoutes({ allowedRoles }) {
  const userData = useSelector((state) => state.auth.userData);

  if (!userData) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(userData.role)) {
    switch (userData.role) {
      case "super-admin":
        return <Navigate to="/super-admin-dashboard" replace />;
      case "manager":
        return <Navigate to="/manager-dashboard" replace />;
      case "kitchen":
        return <Navigate to="/kitchen-dashboard" replace />;
      case "waiter":
        return <Navigate to="/waiter-dashboard" replace />;
      default:
        return <Navigate to="/" replace />; // or a Not Authorized page
    }
  }

  return <Outlet />;
}

export default ProtectedRoutes;
