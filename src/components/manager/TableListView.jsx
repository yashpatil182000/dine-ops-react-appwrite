import React from "react";

function TableListView({ tables }) {
  return (
    <>
      <div className="mb-5">
        <p className="text-stone-700 font-semibold text-lg ">
          Total Tables - {tables.length}{" "}
        </p>
      </div>
      <div className="flex flex-wrap gap-5 w-[95%] lg:w-full">
        {tables?.map((table, index) => (
          <div
            key={index}
            className="bg-stone-200 w-[250px] h-[100px] shadow-lg shadow-stone-300 rounded-xl flex items-center justify-center"
          >
            <p>Table No. {table.table_no}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default TableListView;
