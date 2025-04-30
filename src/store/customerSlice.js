import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerInfo: null,
  restaurantInfo: null,
  menus: null,
  tableInfo: null,
};

export const customerSlice = createSlice({
  name: "customerSlice",
  initialState,
  reducers: {
    setCustomerInfo: (state, action) => {
      state.customerInfo = action.payload;
      console.log("customer set::", action.payload);
    },
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
      state.customerInfo = null;
      state.restaurantInfo = null;
      state.menus = null;
      state.tableInfo = null;
    },
  },
});

export const {
  setCustomerInfo,
  setRestaurantInfo,
  setMenu,
  setTableInfo,
  customerLogout,
} = customerSlice.actions;
export default customerSlice.reducer;
