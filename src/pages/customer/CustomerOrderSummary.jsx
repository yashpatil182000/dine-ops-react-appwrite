import React from "react";
import CustomerNavbar from "../../components/customer/CustomerNavbar";
import { useSelector } from "react-redux";
import IconTextComponent from "../../components/IconTextComponent";
import { TbListDetails } from "react-icons/tb";

function CustomerOrderSummary() {
  const orderDetails = useSelector((state) => state.order.orderDetails);
  console.log(orderDetails);

  const items = orderDetails.items.map((itemStr) => JSON.parse(itemStr));

  console.log("items", items);

  return (
    <>
      <CustomerNavbar />
      <div className="mt-5 ms-5">
        <IconTextComponent
          icon={<TbListDetails size={20} color="#ff6c1f" />}
          text={"Order Summary"}
        />
      </div>
      <div className="bg-white mt-5 mx-3 pb-5 px-2 rounded-lg">
        <div className="flex justify-between text-stone-600 text-sm font-bold px-5 border-b-1 py-2 border-stone-200">
          <p>Items</p>
          <p>Status</p>
        </div>
        {items &&
          items?.map((item, index) => (
            <div key={index} className="flex justify-between mt-3  px-5">
              <div>
                <p className="text-stone-600 font-bold">{item.dish_name}</p>
                <p className="text-stone-500 text-sm font-semibold ">
                  Quantity : {item.quantity}
                </p>
                <p className="text-stone-500 text-sm font-semibold ">
                  Price : ₹ {item.price * item.quantity}
                </p>
              </div>
              <div>
                <p
                  className={`border-1 px-2 rounded text-sm font-bold ${
                    item.status === "Pending" ? "text-amber-400" : ""
                  } `}
                >
                  {item.status}
                </p>
              </div>{" "}
            </div>
          ))}
      </div>
    </>
  );
}

export default CustomerOrderSummary;
