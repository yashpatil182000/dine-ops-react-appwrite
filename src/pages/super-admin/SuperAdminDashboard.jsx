import React, { useEffect, useState } from "react";
import SuperAdminSidebar from "../../components/super-admin/SuperAdminSidebar";
import { useSelector } from "react-redux";
import RestaurantCard from "../../components/super-admin/RestaurantCard";
import { BsBuilding } from "react-icons/bs";

import { databases } from "../../appwrite/appwriteConfig";
import IconTextComponent from "../../components/IconTextComponent";

function SuperAdminDashboard() {
  const userData = useSelector((state) => state.auth.userData);
  // console.log("User from Store::", userData);

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
      <div className="h-screen bg-secondaryLight flex gap-5 lg:gap-10 ">
        <div className="fixed w-fit md:w-[100%] lg:w-[73%]">
          <SuperAdminSidebar />
        </div>
        <div className="w-full ml-22 md:ml-48 lg:ml-52 xl:ml-64 2xl:ml-[475px] py-3">
          <div className="flex gap-2 items-center">
            <div>
              <IconTextComponent
                text={"All Restaurants"}
                icon={<BsBuilding size={22} color="#ff6c1f" />}
              />
            </div>
          </div>
          <div className="w-[95%] mt-8 flex flex-wrap">
            {restaurants ? (
              restaurants.map((restaurant, index) => (
                <div key={index} className="w-full ">
                  <RestaurantCard
                    restaurantName={restaurant.restaurant_name}
                    restaurantAddress={restaurant.restaurant_address}
                    managerName={restaurant.manager_name}
                    managerPhoneNo={restaurant.manager_phone}
                  />
                </div>
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
