import React from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { motion } from "framer-motion";
function PlaceOrderComp({ cartTotal }) {
  return (
    <>
      <motion.div
        className="bg-white flex justify-around rounded-t-4xl p-5 shadow-xl shadow-stone-900"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center gap-2">
          <p className="text-sm text-stone-800">Total : </p>
          <p className="text-primary font-bold text-lg">₹ {cartTotal}</p>
        </div>
        <div>
          <button className="bg-primary px-5 py-2 flex items-center rounded-xl text-white">
            Place Order{" "}
            <span>
              <IoMdArrowDropright size={22} />
            </span>
          </button>
        </div>
      </motion.div>
    </>
  );
}

export default PlaceOrderComp;
