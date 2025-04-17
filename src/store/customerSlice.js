import { createSlice } from "@reduxjs/toolkit";
import { setRestaurant } from "./restaurantSlice";

const initialState = {
  restaurantInfo: null,
  menus: null,
  tableInfo: null,
};

export const customerSlice = createSlice({
  name: "customerSlice",
  initialState,
  reducers: {
    setRestaurantInfo: (state, action) => {
      state.restaurantInfo = action.payload;
      console.log("restaurant set::", action.payload);
    },
    setMenu: (state, action) => {
      state.menus = action.payload;
      console.log("menu set::", action.payload);
    },
    setTableInfo: (state, action) => {
      state.tableInfo = action.payload;
      console.log("table info set::", action.payload);
    },
    customerLogout: (state) => {
      state.restaurantInfo = null;
      state.menus = null;
      state.tableInfo = null;
    },
  },
});

export const { setRestaurantInfo, setMenu, setTableInfo, customerLogout } =
  customerSlice.actions;
export default customerSlice.reducer;
