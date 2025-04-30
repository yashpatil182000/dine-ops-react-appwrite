import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomerNavbar from "../../components/customer/CustomerNavbar";
import IconTextComponent from "../../components/IconTextComponent";
import { FaCartShopping, FaPlus } from "react-icons/fa6";
import CartItem from "../../components/customer/CartItem";
import {
  decreaseQuantity,
  emptyCart,
  increaseQuantity,
} from "../../store/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import PlaceOrderComp from "../../components/customer/PlaceOrderComp";
import { databases } from "../../appwrite/appwriteConfig";
import { ID } from "appwrite";
import { clearOrder, setOrder } from "../../store/orderSlice";

function CustomerCart() {
  const restaurantData = useSelector((state) => state.customer.restaurantInfo);
  const tableData = useSelector((state) => state.customer.tableInfo);
  const cartData = useSelector((state) => state.cart.cart);
  console.log("restaurantData", restaurantData);
  console.log("tableData", tableData);
  console.log("cartData", cartData);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleIncreaseQty = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQty = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const cartTotal = cartData.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const onPlaceorder = async () => {
    if (cartData.length <= 0) {
      return;
    }

    try {
      const orderResponce = await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_ORDERS_COLLECTION_ID,
        ID.unique(),
        {
          restaurant_id: restaurantData.$id,
          table_id: tableData.$id,
          items: cartData.map((item) =>
            JSON.stringify({
              ...item,
              status: "Pending",
            })
          ),
          status: "Pending",
          total_price: cartTotal,
          table_no: tableData.table_no,
        }
      );
      console.log("orderResponce", orderResponce);
      if (orderResponce) {
        dispatch(setOrder(orderResponce));
        dispatch(emptyCart());
        navigate("/customer/landing");
        // setTimeout(() => navigate("/customer/orderSummary"), 2000);
      }
    } catch (error) {
      console.log("Failed to place order :: ", error);
    }
  };

  return (
    <>
      <CustomerNavbar />
      <div className="w-full">
        <div className="mt-3 ms-5 ">
          <IconTextComponent
            icon={<FaCartShopping size={20} color="#ff6c1f" />}
            text={"Your Cart"}
          />
        </div>
        <div className="mt-5 bg-white p-3 mb-20">
          {cartData.map((item, index) => (
            <CartItem
              key={index}
              iconColor={item.isVeg ? "#1D9825" : "#98361D"}
              itemName={item.dish_name}
              price={item.price}
              quantity={item.quantity}
              onIncreaseQty={() => handleIncreaseQty(item.$id)}
              onDecreaseQty={() => handleDecreaseQty(item.$id)}
            />
          ))}
          <Link to={"/customer/landing"}>
            <div className="pt-3 flex gap-2 items-center text-primary">
              <FaPlus size={15} />
              <p className="text-sm font-bold">Add More Items</p>
            </div>
          </Link>
        </div>
        {cartData.length > 0 ? (
          <div className="w-full fixed bottom-0">
            <PlaceOrderComp onclick={onPlaceorder} cartTotal={cartTotal} />
          </div>
        ) : null}
      </div>
    </>
  );
}

export default CustomerCart;
