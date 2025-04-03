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
      <div className="bg-secondaryLight flex gap-5 lg:gap-10 ">
        <ManagerSidebar />
        <div className="w-full py-3">
          <IconTextComponent
            text={"Manager Dashboard"}
            icon={<MdOutlineDashboard size={24} color="#ff6c1f" />}
          />
        </div>
      </div>
    </>
  );
}

export default ManagerDashboard;
