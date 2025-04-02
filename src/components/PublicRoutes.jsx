import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PublicRoutes() {
  const userData = useSelector((state) => state.auth.userData);

  if (userData) {
    return (
      <Navigate
        to={
          userData.role === "super-admin"
            ? "/super-admin-dashboard"
            : "/manager-dashboard"
        }
        replace
      />
    );
  }

  return <Outlet />;
}

export default PublicRoutes;
