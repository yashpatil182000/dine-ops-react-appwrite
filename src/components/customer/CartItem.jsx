import React from "react";
import { BiFoodTag } from "react-icons/bi";
import { IconButton } from "@mui/material";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

function CartItem({
  itemName,
  price,
  iconColor,
  onIncreaseQty,
  onDecreaseQty,
  quantity,
}) {
  return (
    <>
      <div className="bg-white flex  gap-3 py-3 border-b-[0.5px] border-stone-200">
        <div className="mt-0.5">
          <BiFoodTag size={18} color={iconColor} />
        </div>
        <div className="flex flex-col gap-2 w-[85%]">
          <p className="text-stone-800 text-sm font-semibold">{itemName}</p>
          <p className="text-stone-800 text-sm font-semibold">₹ {price}</p>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-1 bg-secondary rounded-xl">
            <div>
              <IconButton onClick={onDecreaseQty}>
                <FiMinusCircle size={18} />
              </IconButton>
            </div>
            <div className="w-[20px]">
              <p className="text-center text-sm">{quantity}</p>
            </div>
            <div>
              <IconButton onClick={onIncreaseQty}>
                <FiPlusCircle size={18} />
              </IconButton>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold">₹ {price * quantity}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartItem;
