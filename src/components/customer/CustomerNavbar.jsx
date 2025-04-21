import React from "react";
import { useSelector } from "react-redux";

function CustomerNavbar() {
  const restaurantData = useSelector((state) => state.customer.restaurantInfo);
  const tableData = useSelector((state) => state.customer.tableInfo);

  return (
    <>
      <div
        className="w-full bg-white p-2 shadow-lg shadow-black/10
      "
      >
        <p className="text-center text-2xl font-bold font-urbanist uppercase text-primary">
          {restaurantData.restaurant_name}
        </p>
        <p className="mt-3 text-center text-md font-semibold font-urbanist  text-stone-500">
          Table No. - {tableData.table_no}
        </p>
      </div>
    </>
  );
}

export default CustomerNavbar;
