import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import restaurantReducer from "./restaurantSlice";
import customerReducer from "./customerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurant: restaurantReducer,
    customer: customerReducer,
  },
});

export default store;
