import React, { useEffect, useState } from "react";
import ManagerSidebar from "../../components/manager/ManagerSidebar";
import IconTextComponent from "../../components/IconTextComponent";
import { MdOutlinePerson } from "react-icons/md";
import AddWaiterComp from "../../components/manager/AddWaiterComp";
import WaiterProfileListView from "../../components/manager/WaiterProfileListView";

function ManagerWaiters() {
  const [refreshWaiters, setRefreshWaiters] = useState(false);

  const handleWaiterAdded = () => {
    setRefreshWaiters((prev) => !prev); // toggle to trigger useEffect
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
              text={"Waiters"}
              icon={<MdOutlinePerson size={22} color="#ff6c1f" />}
            />
          </div>

          <div className="mt-8">
            <AddWaiterComp onWaiterAdded={handleWaiterAdded} />
          </div>
          <div className="mt-10">
            <WaiterProfileListView refreshTrigger={refreshWaiters} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagerWaiters;
