import { RouterProvider } from "react-router-dom";
import routes from "./router/routes";
import { useEffect, useState } from "react";
import { account, databases } from "./appwrite/appwriteConfig";
import { useDispatch } from "react-redux";
import { Query } from "appwrite";
import { setUser } from "./store/authSlice";
import { setRestaurant } from "./store/restaurantSlice";
import { HashLoader } from "react-spinners";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.location.pathname.startsWith("/customer")) {
      setLoading(false);
      return;
    }
    const checkActiveSession = async () => {
      try {
        const authUser = await account.get();
        // console.log(authUser);

        if (!authUser) {
          console.log("No active session");
          setLoading(false);
          return;
        }
        const response = await databases.listDocuments(
          `${import.meta.env.VITE_APPWRITE_DATABASE_ID}`,
          `${import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID}`,
          [Query.equal("email", authUser.email)]
        );

        if (response.documents.length === 0) {
          console.error("User not found in database.");
          setLoading(false);
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
          } finally {
            setLoading(false); // ✅ Ensure loading state is updated
          }
        }

        // Dispatch user data to Redux store
        dispatch(setUser(loggedInUser));
      } catch (error) {
        console.error("Error fetching user session");
      } finally {
        setLoading(false);
      }
    };

    checkActiveSession();
  }, [dispatch, location.pathname]);

  if (loading) {
    return (
      <span className=" w-[75%] text-xl text-gray-600 flex flex-col  items-center gap-5 mt-52 lg:mt-64 mx-auto ">
        <HashLoader color="#ff6c1f" />
        <p className="text-xl font-semibold text-center">
          Preparing your dashboard... Almost there !
        </p>
      </span>
    );
  }

  return <RouterProvider router={routes} />;
}

export default App;
