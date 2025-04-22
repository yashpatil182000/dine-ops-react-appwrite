import React, { useState } from "react";
import { useSelector } from "react-redux";
import MenuCard from "./MenuCard";
import { motion } from "framer-motion";
import { setCartItem } from "../../store/cartSlice";
import { useDispatch } from "react-redux";

function MenuCategories() {
  const menus = useSelector((state) => state.customer.menus);

  const dispatch = useDispatch();

  const [category, setCategory] = useState("Breakfast");

  const handleCategory = (cat) => {
    setCategory(cat);
  };

  const handleAddToCart = (menu) => {
    dispatch(setCartItem({ ...menu, quantity: 1 }));
  };

  const filteredMenus = menus.filter((menu) =>
    menu.categories.includes(category)
  );

  const categories = [
    { name: "Break Fast", value: "Breakfast" },
    { name: "Starters", value: "Starter" },
    { name: "Main Course", value: "Main Course" },
    { name: "Beverages", value: "Beverage" },
  ];
  return (
    <>
      <div className="mt-10 flex justify-center flex-wrap gap-2">
        {categories.map((cat, i) => (
          <div
            className={`${
              cat.value === category ? "bg-primary text-white" : "bg-stone-200"
            }  px-4 py-1 rounded-lg transition-all duration-700`}
            key={i}
            onClick={() => handleCategory(cat.value)}
          >
            <p className="font-semibold">{cat.name}</p>
          </div>
        ))}
      </div>

      <motion.div
        key={category}
        className="mt-5 mb-24 flex flex-col px-4 gap-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {filteredMenus.length > 0 ? (
          filteredMenus.map((menu, idx) => (
            <MenuCard
              key={idx}
              name={menu.dish_name}
              description={menu.dish_description}
              price={menu.price}
              image={menu.imgURL.replace("/preview", "/view")}
              iconColor={menu?.isVeg ? "#1D9825" : "#98361D"}
              onClick={() => handleAddToCart(menu)}
            />
          ))
        ) : (
          <p className="text-center mt-12 text-red-500">
            {category} currently not available
          </p>
        )}
      </motion.div>
    </>
  );
}

export default MenuCategories;
