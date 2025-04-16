import React, { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";
import { toast, ToastContainer } from "react-toastify";

function QRCard({ restaurantName, tableNo, qrUrl }) {
  const qrRef = useRef();

  const handleDownload = () => {
    if (!qrRef.current) return;
    toPng(qrRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `Table-${tableNo}-QR.png`;
        link.href = dataUrl;
        link.click();
        toast.success(`table no. ${tableNo} QR Code Downloaded Successfully`, {
          position: "bottom-center",
        });
      })
      .catch((err) => {
        toast.error("Download failed", {
          position: "bottom-center",
        });
        console.error("Download failed:", err);
      });
  };

  return (
    <div className="flex flex-col items-center">
      <ToastContainer />
      <div
        ref={qrRef}
        className="bg-white p-4 rounded-xl shadow-lg text-center w-[230px]"
      >
        <h2 className="font-bold text-lg text-primary">{restaurantName}</h2>
        <p className="text-gray-600 text-sm mb-2">Table No: {tableNo}</p>
        <QRCodeSVG value={qrUrl} size={150} className="mx-auto" />
      </div>

      <button
        onClick={handleDownload}
        className="mt-2 px-3 py-1 rounded bg-primary text-white text-sm hover:bg-orange-600"
      >
        Download
      </button>
    </div>
  );
}

export default QRCard;
