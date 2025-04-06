import React, { useEffect, useState } from "react";
import WaiterImage from "../../assets/waiter-profile.png";
import { useSelector } from "react-redux";
import { Query } from "appwrite";
import { databases } from "../../appwrite/appwriteConfig";

function WaiterProfileListView({ refreshTrigger }) {
  const restaurantData = useSelector(
    (state) => state.restaurant.restaurantData
  );

  const [waiterList, setWaiterList] = useState();

  const fetchWaiters = async () => {
    try {
      const result = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
        [
          Query.and([
            Query.equal("role", "waiter"),
            Query.equal("restaurant_id", restaurantData.$id),
          ]),
        ]
      );

      if (result.documents.length > 0) {
        setWaiterList(result.documents);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWaiters();
  }, [refreshTrigger]);

  return (
    <>
      {waiterList && (
        <div className="w-[90%] overflow-auto bg-white py-3 rounded-s-xl border-e-8 border-primary flex flex-col gap-3">
          {waiterList
            ? waiterList.map((waiter, index) => (
                <div
                  className={`flex  py-2 flex-col md:flex-row items-center ps-3 gap-3 ${
                    index % 2 !== 0 ? "bg-secondary" : null
                  } `}
                  key={index}
                >
                  <div className="md:me-5">
                    <img src={WaiterImage} className="w-12" alt="" />
                  </div>
                  <div className="md:w-[30%] text-stone-600 font-bold">
                    <p>{waiter.name ? waiter.name : "not found"}</p>
                  </div>
                  <div className="md:w-[30%] text-stone-500 font-semibold">
                    <p>{waiter.name ? waiter.email : "not found"}</p>
                  </div>
                  <div className="md:w-[30%] text-stone-500 font-semibold">
                    <p>{waiter.name ? waiter.phone_no : "not found"}</p>
                  </div>
                </div>
              ))
            : null}
        </div>
      )}
    </>
  );
}

export default WaiterProfileListView;
