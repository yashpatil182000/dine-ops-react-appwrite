import React, { useEffect, useState } from "react";
import ManagerSidebar from "../../components/manager/ManagerSidebar";
import IconTextComponent from "../../components/IconTextComponent";

import { MdOutlineTableRestaurant } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { databases } from "../../appwrite/appwriteConfig";
import { setRestaurant, setTables } from "../../store/restaurantSlice";
import { toast, ToastContainer } from "react-toastify";
import { ID, Query } from "appwrite";

function ManagerTables() {
  const restaurantData = useSelector(
    (state) => state.restaurant.restaurantData
  );

  const [tableList, setTableList] = useState([]);

  const [loading, setLoading] = useState(false);

  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const increaseCount = () => {
    setCount(count + 1);
  };
  const decreaseCount = () => {
    setCount(Math.max(0, count - 1));
  };

  // console.log("tableList", tableList);
  // console.log("count", count);

  const handleAddTables = async () => {
    if (count < 1) {
      toast.error("Tables count must be greater than 0", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    try {
      const promises = [];
      setLoading(true);
      for (let i = 1; i <= count; i++) {
        const tableData = {
          table_no: i,
          restaurant_id: restaurantData.$id,
        };

        const promise = await databases.createDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_TABLES_COLLECTION_ID,
          ID.unique(),
          tableData
        );

        promises.push(promise);
      }

      await Promise.all(promises);

      const result = await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_RESTAURANTS_COLLECTION_ID,
        restaurantData.$id,
        { table_count: promises.length }
      );

      result && dispatch(setRestaurant(result));

      toast.success(`${promises.length} Tables added successfully`, {
        position: "top-right",
        autoClose: 3000,
      });
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.error("Error adding tables:", error);
      toast.error("Failed to add tables", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const fetchTables = async () => {
    try {
      const result = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_TABLES_COLLECTION_ID,
        [Query.equal("restaurant_id", restaurantData.$id)]
      );

      if (result.documents.length >= 0) {
        setTableList(result.documents);
        dispatch(setTables(result.documents));
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Fetching Table Data", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    if (restaurantData?.$id) {
      fetchTables();
    }
  }, [restaurantData?.$id]);

  const tablesData = useSelector((state) => state.restaurant.tablesData);
  console.log("tables From Store: ", tablesData);
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

          {restaurantData?.table_count === null ? (
            <div className="mt-6 w-[95%] px-8 py-3 border-e-8 border-primary rounded-s-2xl shadow-lg shadow-stone-300 bg-white">
              <div>
                <p className="text-stone-500">
                  Oops! seems like you haven't added tables yet.
                </p>
                <p className="mt-1 text-2xl text-primary font-semibold font-urbanist">
                  Lets make a quick Tables Setup
                </p>
              </div>
              <div className="mt-3">
                <div className="flex flex-col md:flex-row gap-2 items-center">
                  <p className="text-stone-700 lg:mt-1  lg:me-5">
                    Add Table Count :{" "}
                  </p>
                  <div className="w-fit flex items-center justify-center gap-2">
                    <span
                      className="mt-2 hover:text-primary text-stone-500"
                      onClick={decreaseCount}
                    >
                      <FiMinusCircle size={25} />
                    </span>
                    <span className="w-[30%] md:w-[25%] lg:w-[30%]">
                      <Input
                        type="number"
                        value={count}
                        onChange={(e) =>
                          setCount(Math.max(0, Number(e.target.value)))
                        }
                      />{" "}
                    </span>
                    <span
                      className="mt-2  hover:text-primary text-stone-500"
                      onClick={increaseCount}
                    >
                      <FiPlusCircle size={25} />
                    </span>
                  </div>
                  <span className="mt-3 mb-1 lg:mt-1">
                    <Button
                      text={!loading ? "Add Tables" : "Adding"}
                      bgColor="bg-stone-800"
                      onClick={handleAddTables}
                    />
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-[95%] mt-6 flex gap-4 flex-wrap">
              {tableList
                ? tableList.map((table, index) => (
                    <div
                      key={index}
                      className={`${
                        table.occupied ? "bg-primary" : "bg-stone-300"
                      }  w-60 h-28 rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      <p className="">Table No. - {table.table_no}</p>
                    </div>
                  ))
                : null}
            </div>
          )}  
        </div>
      </div>
    </>
  );
}

export default ManagerTables;
