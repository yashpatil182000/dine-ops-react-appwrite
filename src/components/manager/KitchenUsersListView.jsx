import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { databases } from "../../appwrite/appwriteConfig";
import { Query } from "appwrite";
import chefImage from "../../assets/chef-profile.png";

function KitchenUsersListView({ refreshKitchenUser }) {
  const restaurantData = useSelector(
    (state) => state.restaurant.restaurantData
  );

  const [kitchenUserList, setKitchenUserList] = useState();

  const fetchKitchenUsers = async () => {
    try {
      const result = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
        [
          
          Query.and([
            Query.equal("role", "kitchen"),
            Query.equal("restaurant_id", restaurantData.$id),
          ]),
        ]
      );

      if (result.documents.length > 0) {
        setKitchenUserList(result.documents);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchKitchenUsers();
  }, [refreshKitchenUser]);

  return (
    <>
      {kitchenUserList && (
        <div className="w-[90%] overflow-auto bg-white py-3 rounded-s-xl border-e-8 border-primary flex flex-col gap-3">
          {kitchenUserList
            ? kitchenUserList.map((kitchenUser, index) => (
                <div
                  className={`flex  py-2 flex-col md:flex-row items-center ps-3 gap-3 ${
                    index % 2 !== 0 ? "bg-secondary" : null
                  } `}
                  key={index}
                >
                  <div className="md:me-5">
                    <img src={chefImage} className="w-12" alt="" />
                  </div>
                  <div className="md:w-[30%] text-stone-600 font-bold">
                    <p>{kitchenUser.name ? kitchenUser.name : "not found"}</p>
                  </div>
                  <div className="md:w-[30%] text-stone-500 font-semibold">
                    <p>{kitchenUser.name ? kitchenUser.email : "not found"}</p>
                  </div>
                  <div className="md:w-[30%] text-stone-500 font-semibold">
                    <p>
                      {kitchenUser.name ? kitchenUser.phone_no : "not found"}
                    </p>
                  </div>
                </div>
              ))
            : null}
        </div>
      )}
    </>
  );
}

export default KitchenUsersListView;
