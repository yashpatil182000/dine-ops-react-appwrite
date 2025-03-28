import React from "react";

function RestaurantCard({
  restaurantName,
  restaurantAddress,
  managerName,
  managerPhoneNo,
}) {
  return (
    <>
      <div className="bg-white w-[35%] px-5 py-3 rounded-lg shadow-md shadow-black/10">
        <div className="flex gap-2 items-center mb-1">
          <p className="text-stone-500 ">Restaurant Name - </p>
          <p className="text-2xl font-bold text-primary">{restaurantName}</p>
        </div>
        <div className="flex gap-2 ">
          <p className="text-stone-500">Address - </p>
          <p className="">{restaurantAddress}</p>
        </div>
        <hr className="text-stone-200 my-5" />
        <div className="flex gap-2 items-center mb-1">
          <p className="text-stone-500">Manager Name - </p>
          <p className="text-lg">{managerName}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-stone-500">Phone Number - </p>
          <p className="">{managerPhoneNo}</p>
        </div>
      </div>
    </>
  );
}

export default RestaurantCard;
