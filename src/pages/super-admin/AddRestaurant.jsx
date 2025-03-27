import React from "react";
import SuperAdminSidebar from "../../components/super-admin/SuperAdminSidebar";

function AddRestaurant() {
  return (
    <>
      <div className="bg-secondaryLight flex gap-10 ">
        <SuperAdminSidebar />
        <div className="w-full">
          <p>add Restaurant</p>
        </div>
      </div>
    </>
  );
}

export default AddRestaurant;
