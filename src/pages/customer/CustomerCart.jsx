import React from "react";
import { useSelector } from "react-redux";

function CustomerCart() {
  const cartData = useSelector((state) => state.cart.cart);

  console.log(cartData);

  return <>Cart</>;
}

export default CustomerCart;
