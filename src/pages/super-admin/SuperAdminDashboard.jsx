import React from "react";

import { useSelector } from "react-redux";

function SuperAdminDashboard() {
  const userData = useSelector((state) => state.auth.userData);

  console.log("User from Store::", userData);

  return (
    <>
      <p>SuperAdminDashboard</p>
    </>
  );
}

export default SuperAdminDashboard;
