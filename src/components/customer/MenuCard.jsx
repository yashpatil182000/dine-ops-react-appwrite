import React from "react";
import { BiFoodTag } from "react-icons/bi";
import { MdOutlineAddShoppingCart } from "react-icons/md";

function MenuCard({ image, name, description, price, iconColor }) {
  return (
    <>
      <div className="bg-white rounded-lg items-center flex flex-col p-5 shadow-lg shadow-black/10 relative">
        <div className="absolute top-3 left-4">
          <BiFoodTag size={28} color={iconColor} />
        </div>
        <img className="image-drop-shadow w-40" src={image} alt="" />

        <div className="flex flex-col gap-1">
          <p className="text-xl font-bold text-primary">{name}</p>
          <p className="text-sm font-semibold italic text-stone-600">
            ( {description} )
          </p>
        </div>
        <div className="mt-5 w-full flex justify-between">
          <p className="text-xl font-bold text-stone-800">₹ {price}</p>
          <button className="flex items-center gap-2 bg-primary px-4 py-0.5 rounded-lg text-white uppercase font-bold text-sm ">
            {" "}
            <span>
              <MdOutlineAddShoppingCart size={18} />
            </span>{" "}
            Add
          </button>
        </div>
      </div>
    </>
  );
}

export default MenuCard;
