import React from "react";

function RestaurantCard({
  restaurantName,
  restaurantAddress,
  managerName,
  managerPhoneNo,
}) {
  return (
    <>
      <div
        className="bg-white w-full px-5 py-3 rounded-lg shadow-md shadow-black/10 
      mb-5"
      >
        <div className="flex flex-col md:flex-row lg:gap-2 items-center mb-3 lg:mb-1">
          <p className="text-stone-500 ">Restaurant Name - </p>
          <p className="text-2xl font-bold text-primary text-center">
            {restaurantName}
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center lg:gap-2 mb-3 lg:mb-0 ">
          <p className="text-stone-500">Address - </p>
          <p className="text-center text-stone-600">{restaurantAddress}</p>
        </div>
        <hr className="text-stone-200 my-5" />
        <div className="flex flex-col md:flex-row  lg:gap-2 items-center mb-3 lg:mb-1">
          <p className="text-stone-500">Manager Name - </p>
          <p className="text-lg font-bold text-stone-600 text-center ">
            {managerName}
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center lg:gap-2 ">
          <p className="text-stone-500">Phone Number - </p>
          <p className="text-lg font-bold text-stone-600 text-center">
            {managerPhoneNo}
          </p>
        </div>
      </div>
    </>
  );
}

export default RestaurantCard;
