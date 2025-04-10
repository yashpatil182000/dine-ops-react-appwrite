import { Dialog, IconButton } from "@mui/material";
import React, { useState } from "react";

import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import IconTextComponent from "../IconTextComponent";
import Input from "../Input";
import { MdOutlineTableRestaurant } from "react-icons/md";
import Button from "../Button";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { databases } from "../../appwrite/appwriteConfig";
import { ID } from "appwrite";

function AddTableComp() {
  const restaurantData = useSelector(
    (state) => state.restaurant.restaurantData
  );
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0); // initialize count

  const handleDialog = () => {
    setOpen((prev) => !prev);
  };

  const increaseCount = () => {
    setCount((prev) => prev + 1);
  };

  const decreaseCount = () => {
    if (count > 0) setCount((prev) => prev - 1);
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setCount(value);
    } else {
      setCount("");
    }
  };

  const handleAddTables = async () => {
    if (count <= 0) {
      toast.error("Please enter a valid table count greater than 0");
      return;
    }

    const restaurantId = restaurantData?.$id;

    try {
      const toastId = toast.loading("Adding tables...");
      const promises = [];

      for (let i = 1; i <= count; i++) {
        const tableData = {
          restaurant_id: restaurantId,
          table_no: i, // unique-ish table number
        };

        const promise = databases.createDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID, // replace with your DB ID
          import.meta.env.VITE_APPWRITE_TABLES_COLLECTION_ID, // replace with your Table Collection ID
          ID.unique(),
          tableData
        );

        promises.push(promise);
      }

      await Promise.all(promises);

      toast.update(toastId, {
        render: `${count} tables added successfully!`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setCount(0); // reset count
      setOpen(false); // close modal
    } catch (error) {
      console.error("Error adding tables:", error);
      toast.error("Something went wrong while adding tables.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div>
        <p className="text-stone-500">
          Oops! Seems like you haven't added tables yet
        </p>
        <p className="mt-1 text-primary font-bold text-2xl">
          Let's Make a Quick Table setup
        </p>
      </div>
      <button
        className="mt-5 flex items-center gap-2 relative px-5 py-1 overflow-hidden rounded-lg bg-primary text-white transition-all duration-500 before:absolute before:inset-0 before:bg-white/20 before:scale-0 hover:before:scale-150 text-md font-semibold shadow-md shadow-stone-400 cursor-pointer"
        onClick={handleDialog}
      >
        <MdOutlineTableRestaurant size={24} />
        Add Tables
      </button>
      <Dialog open={open} onClose={handleDialog}>
        <div className="py-5 px-5 md:px-10 border-e-8 border-primary">
          <div className="w-full flex justify-center">
            <IconTextComponent
              text={"Add Tables "}
              icon={<MdOutlineTableRestaurant size={26} color="#ff6c1f" />}
            />
          </div>
          <div className="mt-5 flex items-center gap-2">
            <div className="mt-2">
              <IconButton onClick={decreaseCount}>
                <FiMinusCircle />
              </IconButton>
            </div>

            <div className="w-[100px]">
              <Input
                type="number"
                value={count}
                onChange={handleInputChange}
                placeholder={"count"}
              />
            </div>
            <div className="mt-2">
              <IconButton onClick={increaseCount}>
                <FiPlusCircle />
              </IconButton>
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <Button
              text={"Add"}
              bgColor="bg-stone-800"
              onClick={handleAddTables}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default AddTableComp;
