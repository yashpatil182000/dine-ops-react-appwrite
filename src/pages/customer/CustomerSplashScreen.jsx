import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { databases } from "../../appwrite/appwriteConfig";
import { Query } from "appwrite";
import { useDispatch } from "react-redux";
import {
  setMenu,
  setRestaurantInfo,
  setTableInfo,
} from "../../store/customerSlice";

function CustomerSplashScreen() {
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const restaurantId = params.get("restaurantId");
  const tableNo = params.get("table");

  const dispatch = useDispatch();
  const [restaurant, setRestaurant] = useState();
  const [table, setTable] = useState();

  const fetchAllInfo = async () => {
    try {
      const responce = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_RESTAURANTS_COLLECTION_ID,
        [Query.equal("$id", restaurantId)]
      );
      if (responce.documents.length > 0) {
        const fetchedRestaurant = responce.documents[0];
        setRestaurant(fetchedRestaurant);
        dispatch(setRestaurantInfo(fetchedRestaurant));
      }

      const tableResponce = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_TABLES_COLLECTION_ID,
        [
          Query.and([
            Query.equal("table_no", Number(tableNo)),
            Query.equal("restaurant_id", restaurantId),
          ]),
        ]
      );
      if (tableResponce.documents.length > 0) {
        const fetchedTable = tableResponce.documents[0];
        setTable(fetchedTable);
        dispatch(setTableInfo(fetchedTable));
      }

      const menuResponce = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_MENU_COLLECTION_ID,
        [Query.equal("restaurant_id", restaurantId)]
      );
      if (menuResponce.documents.length > 0) {
        const fetchedMenus = menuResponce.documents;
        dispatch(setMenu(fetchedMenus));
      }
    } catch (error) {
      console.log("Error Fetching All Information :: ", error);
    }
  };

  useEffect(() => {
    fetchAllInfo();
    const timer = setTimeout(() => {
      navigate("/customer/landing");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-white flex-col">
        <h1 className="text-3xl font-bold text-gray-800 animate-pulse">
          Welcome to {restaurant?.restaurant_name}
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Setting up your experience...
        </p>
      </div>{" "}
    </>
  );
}

export default CustomerSplashScreen;
