import React from "react";
import ManagerSidebar from "../../components/manager/ManagerSidebar";
import IconTextComponent from "../../components/IconTextComponent";
import { MdOutlineDashboard } from "react-icons/md";
import { useSelector } from "react-redux";

function ManagerDashboard() {
  const userData = useSelector((state) => state.auth.userData);
  // console.log("User from Store::", userData);

  const restaurantData = useSelector(
    (state) => state.restaurant.restaurantData
  );
  console.log("Restaurant from Store::", restaurantData);

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
              text={"Manager Dashboard"}
              icon={<MdOutlineDashboard size={22} color="#ff6c1f" />}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagerDashboard;
