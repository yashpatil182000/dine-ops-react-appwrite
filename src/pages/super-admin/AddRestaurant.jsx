import React from "react";
import SuperAdminSidebar from "../../components/super-admin/SuperAdminSidebar";
import AddRestaurantForm from "../../components/super-admin/AddRestaurantForm";
import IconTextComponent from "../../components/IconTextComponent";
import { BsBuildingAdd } from "react-icons/bs";

function AddRestaurant() {
  return (
    <>
      <div className="bg-secondaryLight flex gap-10 ">
        <SuperAdminSidebar />
        <div className="w-full py-3">
          <IconTextComponent
            text={"Add New Restaurant"}
            icon={<BsBuildingAdd size={22} color="#ff6c1f" />}
          />
          <AddRestaurantForm />
        </div>
      </div>
    </>
  );
}

export default AddRestaurant;
