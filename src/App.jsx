import { RouterProvider } from "react-router-dom";
import routes from "./router/routes";
import { useEffect } from "react";
import { account, databases } from "./appwrite/appwriteConfig";
import { useDispatch } from "react-redux";
import { Query } from "appwrite";
import { setUser } from "./store/authSlice";
import { setRestaurant } from "./store/restaurantSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkActiveSession = async () => {
      try {
        const authUser = await account.get();
        // console.log(authUser);

        if (!authUser) {
          console.log("No active session");
          return;
        }
        const response = await databases.listDocuments(
          `${import.meta.env.VITE_APPWRITE_DATABASE_ID}`,
          `${import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID}`,
          [Query.equal("email", authUser.email)]
        );

        if (response.documents.length === 0) {
          console.error("User not found in database.");
          return;
        }

        const loggedInUser = response.documents[0];

        if (loggedInUser.role !== "super-admin") {
          try {
            const restaurantResponse = await databases.listDocuments(
              import.meta.env.VITE_APPWRITE_DATABASE_ID,
              import.meta.env.VITE_APPWRITE_RESTAURANTS_COLLECTION_ID,
              [Query.equal("$id", loggedInUser.restaurant_id)]
            );

            if (restaurantResponse.documents.length > 0) {
              const restaurantInfo = restaurantResponse.documents[0];
              dispatch(setRestaurant(restaurantInfo));
            }
          } catch (error) {
            console.log("Error Fetching Restaurant :: ", error);
          }
        }

        // Dispatch user data to Redux store
        dispatch(setUser(loggedInUser));
      } catch (error) {
        console.error("Error fetching user session");
      }
    };

    checkActiveSession();
  }, [dispatch]);
  return <RouterProvider router={routes} />;
}

export default App;
