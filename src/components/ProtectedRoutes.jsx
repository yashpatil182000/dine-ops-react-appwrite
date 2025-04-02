import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoutes({ allowedRoles }) {
  const userData = useSelector((state) => state.auth.userData);

  if (!userData) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(userData.role)) {
    return userData.role === "super-admin" ? (
      <Navigate to="/super-admin-dashboard" replace />
    ) : (
      <Navigate to="/manager-dashboard" replace />
    );
  }

  return <Outlet />;
}

export default ProtectedRoutes;
