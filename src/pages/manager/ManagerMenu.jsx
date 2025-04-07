import React from "react";
import IconTextComponent from "../../components/IconTextComponent";
import ManagerSidebar from "../../components/manager/ManagerSidebar";
import AddMenuComp from "../../components/manager/AddMenuComp";
import { MdRestaurantMenu } from "react-icons/md";

function ManagerMenu() {
  return (
    <>
      <div className="h-screen bg-secondaryLight flex gap-5 lg:gap-10">
        <div className="fixed w-fit md:w-[100%] lg:w-[73%]">
          <ManagerSidebar />
        </div>
        <div
          className="w-full ml-22 md:ml-48 lg:ml-52 xl:ml-64 2xl:ml-[475px] py-3  
    h-[95%] overflow-auto"
        >
          <div>
            <IconTextComponent
              text={"Menu"}
              icon={<MdRestaurantMenu  size={22} color="#ff6c1f" />}
            />
          </div>

          <div className="mt-8">
            <AddMenuComp />
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagerMenu;
