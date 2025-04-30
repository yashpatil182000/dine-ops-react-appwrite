import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderDetails: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.orderDetails = action.payload;
    },

    clearOrder: (state) => {
      state.orderDetails = null;
    },
  },
});

export const { setOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
