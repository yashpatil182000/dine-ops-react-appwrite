import React, { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import { useSelector } from "react-redux";
import { databases } from "../../appwrite/appwriteConfig";
import { Query } from "appwrite";

function AllMenuView({ refreshTrigger }) {
  const restaurantData = useSelector(
    (state) => state.restaurant.restaurantData
  );

  const [menuList, setMenuList] = useState();

  const fetchMenu = async () => {
    try {
      const result = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_MENU_COLLECTION_ID,
        [Query.equal("restaurant_id", restaurantData.$id)]
      );

      if (result.documents.length > 0) {
        setMenuList(result.documents);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [refreshTrigger]);

  return (
    <>
      {menuList ? (
        <div className="w-[92%] lg:w-[98%] flex flex-wrap gap-5">
          {menuList &&
            menuList.map((menu, index) => (
              <div key={index}>
                <MenuCard
                  name={menu?.dish_name}
                  imageURL={menu?.imgURL.replace("/preview", "/view")}
                  iconColor={menu?.isVeg ? "#1D9825" : "#98361D"}
                />
              </div>
            ))}
        </div>
      ) : null}
    </>
  );
}

export default AllMenuView;
