import React, { useEffect, useState } from "react";
import ManagerSidebar from "../../components/manager/ManagerSidebar";
import IconTextComponent from "../../components/IconTextComponent";

import { MdOutlineTableRestaurant } from "react-icons/md";
import { useSelector } from "react-redux";

import { databases } from "../../appwrite/appwriteConfig";
import { toast, ToastContainer } from "react-toastify";
import { ID, Query } from "appwrite";
import AddTableComp from "../../components/manager/AddTableComp";
import TableListView from "../../components/manager/TableListView";

function ManagerTables() {
  const restaurantData = useSelector(
    (state) => state.restaurant.restaurantData
  );

  const [tableList, setTableList] = useState([]);

  const fetchtables = async () => {
    let promise = databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID, // replace with your DB ID
      import.meta.env.VITE_APPWRITE_TABLES_COLLECTION_ID, // replace with your Table
      [
        Query.equal("restaurant_id", restaurantData?.$id),
        Query.orderAsc("table_no"), // this should be outside of Query.and
      ]
    );

    promise.then(
      function (response) {
        setTableList(response.documents);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    fetchtables();
  }, []);

  return (
    <>
      <ToastContainer />
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
              text={"Tables"}
              icon={<MdOutlineTableRestaurant size={22} color="#ff6c1f" />}
            />
          </div>
          <div className="mt-8">
            {tableList?.length <= 0 ? (
              <AddTableComp />
            ) : (
              <TableListView tables={tableList} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagerTables;
