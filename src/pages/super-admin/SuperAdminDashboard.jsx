import React from "react";
import Button from "../../components/Button";
import SuperAdminSidebar from "../../components/super-admin/SuperAdminSidebar";

import { useSelector } from "react-redux";

function SuperAdminDashboard() {
  const userData = useSelector((state) => state.auth.userData);
  console.log("User from Store::", userData);

  return (
    <>
      <div className="bg-secondaryLight flex gap-10 ">
        <SuperAdminSidebar />
        <div className="w-full">
          <p>all restaurant will be displayed here</p>
        </div>
      </div>
    </>
  );
}

export default SuperAdminDashboard;
