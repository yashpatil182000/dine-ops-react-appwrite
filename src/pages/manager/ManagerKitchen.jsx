import React, { useState } from "react";
import ManagerSidebar from "../../components/manager/ManagerSidebar";
import { LuChefHat } from "react-icons/lu";
import IconTextComponent from "../../components/IconTextComponent";
import AddKitchenComp from "../../components/manager/AddKitchenComp";
import KitchenUsersListView from "../../components/manager/KitchenUsersListView";

function ManagerKitchen() {
  const [refreshKitchenUser, setRefreshKitchenUser] = useState(false);

  const handleKitchenUserAdded = () => {
    setRefreshKitchenUser((prev) => !prev); // toggle to trigger useEffect
  };
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
              text={"Kitchen"}
              icon={<LuChefHat size={22} />}
            />
          </div>

          <div className="mt-8">
            <AddKitchenComp onKitchenUserAdded={handleKitchenUserAdded} />
          </div>
          <div className="mt-10">
            <KitchenUsersListView refreshKitchenUser={refreshKitchenUser} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagerKitchen;
