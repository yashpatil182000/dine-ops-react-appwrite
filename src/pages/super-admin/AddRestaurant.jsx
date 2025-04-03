import React from "react";
import SuperAdminSidebar from "../../components/super-admin/SuperAdminSidebar";
import AddRestaurantForm from "../../components/super-admin/AddRestaurantForm";
import IconTextComponent from "../../components/IconTextComponent";
import { BsBuildingAdd } from "react-icons/bs";

function AddRestaurant() {
  return (
    // <>
    //   <div className="bg-secondaryLight flex gap-5 lg:gap-10">
    //     <SuperAdminSidebar />
    //     <div className="w-full py-3">
    //       <IconTextComponent
    //         text={"Add New Restaurant"}
    //         icon={<BsBuildingAdd size={22} color="#ff6c1f" />}
    //       />
    //       <AddRestaurantForm />
    //     </div>
    //   </div>
    // </>
    <>
      <div className="h-screen bg-secondaryLight flex gap-5 lg:gap-10">
        <div className="fixed w-fit md:w-[100%] lg:w-[73%]">
          <SuperAdminSidebar />
        </div>
        <div
          className="w-full ml-22 md:ml-48 lg:ml-52 xl:ml-64 2xl:ml-[475px] py-3  
        h-[95%] overflow-auto"
        >
          <div className="w-fit flex gap-2 items-center">
            <div>
              <IconTextComponent
                text={"Add New Restaurant"}
                icon={<BsBuildingAdd size={22} color="#ff6c1f" />}
              />
            </div>
          </div>
          <div className="w-[95%]">
            <AddRestaurantForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default AddRestaurant;
