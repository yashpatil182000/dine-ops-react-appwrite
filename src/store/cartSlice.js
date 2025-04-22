import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItem: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.$id === action.payload.$id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },

    removeCartItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.$id !== action.payload); //Send ID only not object
    },

    increaseQuantity: (state, action) => {
      const item = state.cart.find((item) => item.$id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.cart.find((item) => item.$id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        state.cart = state.cart.filter((i) => i.$id !== item.$id);
      }
    },

    emptyCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  setCartItem,
  removeCartItem,
  emptyCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
