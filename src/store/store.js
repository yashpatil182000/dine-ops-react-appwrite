import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import restaurantReducer from "./restaurantSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurant: restaurantReducer,
  },
});

export default store;
