import React from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";

function MenuCard({ image, name, description, price, isVeg }) {
  return (
    <>
      <div className="bg-white rounded-lg items-center flex gap-5 p-2 shadow-lg shadow-black/10">
        <img
          className="image-drop-shadow w-[115px] h-[115px]"
          src={image}
          alt=""
        />

        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold text-primary">{name}</p>
          <p className="text-sm font-semibold italic text-stone-600">
            ( {description} )
          </p>
          <p className="text-lg font-bold text-stone-800">₹ {price}</p>
          <div className="">
            <button className="flex items-center gap-2 bg-primary px-4 py-0.5 rounded-lg text-white uppercase font-bold text-sm ">
              {" "}
              <span>
                <MdOutlineAddShoppingCart size={18} />
              </span>{" "}
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuCard;
