import React from "react";
import ManagerSidebar from "../../components/manager/ManagerSidebar";
import IconTextComponent from "../../components/IconTextComponent";
import { MdOutlineDashboard } from "react-icons/md";

function ManagerDashboard() {
  return (
    <>
      <div className="bg-secondaryLight flex gap-10 ">
        <ManagerSidebar />
        <div className="w-full py-3">
          <IconTextComponent
            text={"Manager Dashboard"}
            icon={<MdOutlineDashboard size={22} color="#ff6c1f" />}
          />
        </div>
      </div>
    </>
  );
}

export default ManagerDashboard;
