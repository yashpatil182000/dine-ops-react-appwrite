import React, { useEffect } from "react";
import { motion } from "framer-motion";

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
  const restaurantName = params.get("restaurantName");

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
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const popIn = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: [0, 1.4, 1],
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  return (
    <>
      <motion.div
        className="w-full flex items-center justify-center h-screen bg-gradient-to-br from-white to-gray-100 flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.p
          className="text-md text-gray-500 mt-2 tracking-wide"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Welcome to
        </motion.p>

        <div className="flex mt-2">
          {[...restaurantName].map((char, i) => (
            <motion.span
              key={i}
              className="text-4xl font-bold text-gray-800"
              variants={popIn}
              initial="hidden"
              animate="visible"
              custom={i}
              style={{ display: "inline-block", marginRight: "2px" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>

        <p
          className="text-sm text-gray-500 mt-4 tracking-wide animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Setting up your experience...
        </p>
      </motion.div>
    </>
  );
}

export default CustomerSplashScreen;
