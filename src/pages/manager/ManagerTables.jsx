import React from "react";
import ManagerSidebar from "../../components/manager/ManagerSidebar";
import IconTextComponent from "../../components/IconTextComponent";

import { MdOutlineTableRestaurant } from "react-icons/md";

function ManagerTables() {
  return (
    <>
      <div className="bg-secondaryLight flex gap-10 ">
        <ManagerSidebar />
        <div className="w-full py-3">
          <div>
            <IconTextComponent
              text={"Tables"}
              icon={<MdOutlineTableRestaurant size={22} color="#ff6c1f" />}
            />
          </div>

          
        </div>
      </div>
    </>
  );
}

export default ManagerTables;
