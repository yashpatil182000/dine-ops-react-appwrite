import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurantData: null,
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurantData = action.payload;
    },
    clearRestaurant: (state) => {
      state.restaurantData = null;
    },
  },
});

export const { clearRestaurant, setRestaurant } = restaurantSlice.actions;

export default restaurantSlice.reducer;
