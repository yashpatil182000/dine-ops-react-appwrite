import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomerNavbar from "../../components/customer/CustomerNavbar";
import IconTextComponent from "../../components/IconTextComponent";
import { FaCartShopping, FaPlus } from "react-icons/fa6";
import CartItem from "../../components/customer/CartItem";
import { decreaseQuantity, increaseQuantity } from "../../store/cartSlice";
import { Link } from "react-router-dom";

function CustomerCart() {
  const cartData = useSelector((state) => state.cart.cart);

  console.log(cartData);

  const dispatch = useDispatch();
  const handleIncreaseQty = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQty = (id) => {
    dispatch(decreaseQuantity(id));
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
        <div className="mt-5 bg-white p-3">
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
            <div className="pt-3 flex gap-2 items-center text-stone-600">
              <FaPlus size={15} />
              <p className="text-sm font-bold">Add More Items</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CustomerCart;
