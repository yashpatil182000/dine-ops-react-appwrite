import React, { useEffect, useState } from "react";
import SuperAdminSidebar from "../../components/super-admin/SuperAdminSidebar";
import { useSelector } from "react-redux";
import RestaurantCard from "../../components/super-admin/RestaurantCard";
import { BsBuilding } from "react-icons/bs";

import { databases } from "../../appwrite/appwriteConfig";
import IconTextComponent from "../../components/IconTextComponent";

function SuperAdminDashboard() {
  const userData = useSelector((state) => state.auth.userData);
  console.log("User from Store::", userData);

  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async () => {
    try {
      let responce = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_RESTAURANTS_COLLECTION_ID
      );

      if (responce && responce.documents) {
        setRestaurants(responce.documents);
      }
    } catch (error) {
      console.log("Restaurant Fetching Error :: ", error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <>
      <div className="bg-secondaryLight flex gap-10 ">
        <SuperAdminSidebar />
        <div className="w-full py-3">
          <div className="flex gap-2 items-center">
            <div>
              <IconTextComponent
                text={"All Restaurants"}
                icon={<BsBuilding size={22} color="#ff6c1f" />}
              />
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-5">
            {restaurants ? (
              restaurants.map((restaurant, index) => (
                <RestaurantCard
                  key={index}
                  restaurantName={restaurant.restaurant_name}
                  restaurantAddress={restaurant.restaurant_address}
                  managerName={restaurant.manager_name}
                  managerPhoneNo={restaurant.manager_phone}
                />
              ))
            ) : (
              <p>No Restaurants to show</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SuperAdminDashboard;
