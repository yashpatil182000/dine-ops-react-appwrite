import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurantData: null,
  tablesData: null,
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurantData = action.payload;
    },
    setTables: (state, action) => {
      state.tablesData = action.payload;
    },
    clearRestaurant: (state) => {
      state.restaurantData = null;
      state.tablesData = null;
    },
  },
});

export const { clearRestaurant, setRestaurant, setTables } =
  restaurantSlice.actions;

export default restaurantSlice.reducer;
