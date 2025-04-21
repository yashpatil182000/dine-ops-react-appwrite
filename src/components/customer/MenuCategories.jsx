import React, { useState } from "react";
import { useSelector } from "react-redux";
import MenuCard from "./MenuCard";

function MenuCategories() {
  const menus = useSelector((state) => state.customer.menus);

  const [category, setCategory] = useState("Break Fast");

  const handleCategory = (cat) => {
    setCategory(cat);
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
            className="bg-stone-200 px-4 py-1 rounded-lg"
            key={i}
            onClick={() => handleCategory(cat.value)}
          >
            <p className="font-semibold">{cat.name}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-col px-2 gap-4">
        {filteredMenus.length > 0 ? (
          filteredMenus.map((menu, idx) => (
            <MenuCard
              key={idx}
              name={menu.dish_name}
              description={menu.dish_description}
              price={menu.price}
              image={menu.imgURL.replace("/preview", "/view")}
            />
          ))
        ) : (
          <p className="text-center mt-12 text-red-500">
            {category} currently not available
          </p>
        )}
      </div>
    </>
  );
}

export default MenuCategories;
