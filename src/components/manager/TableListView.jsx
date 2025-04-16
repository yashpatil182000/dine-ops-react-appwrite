import React, { useState } from "react";
import { Dialog, IconButton } from "@mui/material";
import { FaRegEye } from "react-icons/fa";
import QRCard from "../QRCard";

function TableListView({ tables, restaurantName }) {
  const [selectedTable, setSelectedTable] = useState(null);

  const handleShowQRCard = (table) => {
    setSelectedTable(table);
  };

  const handleCloseQRCard = () => {
    setSelectedTable(null);
  };

  return (
    <>
      <div className="mb-5">
        <p className="text-stone-700 font-semibold text-lg">
          Total Tables - {tables.length}
        </p>
      </div>
      <div className="flex flex-wrap gap-5 w-[95%] lg:w-full">
        {tables?.map((table, index) => (
          <div
            key={index}
            className="p-5 bg-stone-200 w-[250px] h-[100px] shadow-lg shadow-stone-300 rounded-xl flex flex-col items-center justify-around"
          >
            <p>Table No. {table.table_no}</p>
            <div className="flex items-center">
              <p className="text-xs">Show QR Code: </p>
              <IconButton
                aria-label="show-qr"
                onClick={() => handleShowQRCard(table)}
              >
                <FaRegEye />
              </IconButton>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        open={Boolean(selectedTable)}
        onClose={handleCloseQRCard}
        hideBackdrop
        PaperProps={{
          sx: {
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: 2,
            backgroundColor: "#fff",
          },
        }}
      >
        {selectedTable && (
          <div className="p-12 bg-white">
            <QRCard
              tableNo={selectedTable.table_no}
              restaurantName={restaurantName}
              qrUrl={selectedTable.qr_url}
            />
          </div>
        )}
      </Dialog>
    </>
  );
}

export default TableListView;
