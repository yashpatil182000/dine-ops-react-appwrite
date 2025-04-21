import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItem: (state, action) => {
      state.cart.push(action.payload);
      console.log("cart from store::", [...state.cart]);
    },
    removeCartItem: (state, action) => {
      state.cart = state.cart.filter((item) => item !== action.payload);
    },
    emptyCart: (state) => {
      state.cart = [];
    },
  },
});

export const { setCartItem, removeCartItem, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
