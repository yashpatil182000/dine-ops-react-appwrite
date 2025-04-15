import React from "react";
import WaiterSidebar from "../../components/waiter/WaiterSidebar";
import IconTextComponent from "../../components/IconTextComponent";
import { MdOutlinePerson } from "react-icons/md";

function WaiterDashboard() {
  return (
    <>
      <div className="h-screen bg-secondaryLight flex gap-5 lg:gap-10">
        <div className="fixed w-fit md:w-[100%] lg:w-[73%]">
          <WaiterSidebar />
        </div>
        <div
          className="w-full ml-22 md:ml-48 lg:ml-52 xl:ml-64 2xl:ml-[475px] py-3  
  h-[95%] overflow-auto"
        >
          <div>
            <IconTextComponent
              text={"Waiter Dashboard"}
              icon={<MdOutlinePerson size={22} color="#ff6c1f" />}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default WaiterDashboard;
