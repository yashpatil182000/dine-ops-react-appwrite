import React from "react";
import SuperAdminSidebar from "../../components/super-admin/SuperAdminSidebar";
import AddRestaurantForm from "../../components/super-admin/AddRestaurantForm";

function AddRestaurant() {
  return (
    <>
      <div className="bg-secondaryLight flex gap-10 ">
        <SuperAdminSidebar />
        <div className="w-full py-3">
          <AddRestaurantForm />
        </div>
      </div>
    </>
  );
}

export default AddRestaurant;
