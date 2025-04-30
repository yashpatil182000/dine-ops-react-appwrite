import React, { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emptyCart } from "../../store/cartSlice";

function CartOverview({ count }) {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   // Fire from left-bottom corner
  //   confetti({
  //     particleCount: 50,
  //     angle: 60,
  //     spread: 55,
  //     origin: { x: 0, y: 1 },
  //   });

  //   confetti({
  //     particleCount: 50,
  //     angle: 120,
  //     spread: 55,
  //     origin: { x: 1, y: 1 },
  //   });
  // }, []);

  return (
    <>
      <motion.div
        className="bg-primary p-3"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Link to={"/customer/cart"}>
          <div className="flex items-center justify-center gap-3">
            <p className="text-white mb-0.5">
              {count} items added to your cart
            </p>
            <motion.div
              initial={{ x: -10, opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <FaArrowRight color="#fff" />
            </motion.div>{" "}
          </div>
          <p className="text-center text-sm text-white ">Tap to see cart</p>
        </Link>
        {/* <div>
          <button className="bg-white" onClick={() => dispatch(emptyCart())}>
            emptyCart
          </button>
        </div> */}
      </motion.div>
    </>
  );
}

export default CartOverview;
