import { Dialog } from "@mui/material";
import React, { useState } from "react";
import { BiFoodTag } from "react-icons/bi";

function MenuCard({ imageURL, iconColor, name, onClick }) {
  return (
    <>
      <div
        onClick={onClick}
        className="bg-secondary flex flex-col items-center gap-2  pt-1 pb-3  w-[215px] lg:w-[250px] lg:h-[240px] h-[220px] rounded-xl shadow-lg shadow-black/10 relative group hover:shadow-xl hover:shadow-primary/20 duration-300 cursor-pointer"
      >
        <div className="absolute top-3 right-6">
          <BiFoodTag size={25} color={iconColor} />
        </div>{" "}
        <div className="mt-2">
          <img
            src={imageURL}
            className="w-36 lg:w-44 image-drop-shadow duration-300 group-hover:scale-105  "
            alt="dish-img"
          />
        </div>
        <div>
          <p className="text-lg font-bold text-stone-700 text-center">{name}</p>
        </div>
      </div>
    </>
  );
}

export default MenuCard;
