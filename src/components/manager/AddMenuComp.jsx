import React, { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import IconTextComponent from "../IconTextComponent";
import { MdRestaurantMenu } from "react-icons/md";
import { Dialog, FormControlLabel, Checkbox } from "@mui/material";
import { useSelector } from "react-redux";
import { databases, storage } from "../../appwrite/appwriteConfig";
import { ID } from "appwrite";
import { toast, ToastContainer } from "react-toastify";

function AddMenuComp() {
  const restaurantData = useSelector(
    (state) => state.restaurant.restaurantData
  );

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    dishName: "",
    aboutDish: "",
    price: "",
    type: null,
    category: [],
    availability: null,
    image: null,
  });
  const [errors, setErrors] = useState({});

  const handleDialog = () => {
    setOpen((prev) => !prev);
    setFormData({
      dishName: "",
      aboutDish: "",
      price: "",
      type: null,
      category: [],
      availability: null,
      image: null,
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.dishName) newErrors.dishName = "Dish name is required";
    if (!formData.aboutDish) newErrors.aboutDish = "Description is required";
    if (!formData.price || isNaN(formData.price))
      newErrors.price = "Valid price is required";
    if (formData.type === null) newErrors.type = "Please select dish type";
    if (!formData.category.length)
      newErrors.category = "Select at least one category";
    if (!formData.availability === null)
      newErrors.availability = "Set availability status";
    if (!formData.image) newErrors.image = "Upload an image";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckboxChange = (field, value) => {
    if (field === "category") {
      const category = formData.category.includes(value)
        ? formData.category.filter((c) => c !== value)
        : [...formData.category, value];
      setFormData({ ...formData, category });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleAddMenu = async () => {
    if (!validateForm()) return;

    try {
      const file = formData.image;
      const uploadedFile = await toast.promise(
        storage.createFile(
          import.meta.env.VITE_APPWRITE_MENU_IMAGE_BUCKET_ID,
          ID.unique(),
          file
        ),
        {
          pending: "Uploading image...",
          success: "Image uploaded!",
          error: "Image upload failed!",
        }
      );

      const imageUrl = storage.getFilePreview(
        import.meta.env.VITE_APPWRITE_MENU_IMAGE_BUCKET_ID,
        uploadedFile.$id
      ).href;

      await toast.promise(
        databases.createDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_MENU_COLLECTION_ID,
          ID.unique(),
          {
            restaurant_id: restaurantData?.$id,
            dish_name: formData.dishName,
            dish_description: formData.aboutDish,
            price: Number(formData.price),
            isVeg: formData.type,
            catagories: formData.category,
            available: formData.availability,
            imgURL: imageUrl,
          }
        ),
        {
          pending: "Adding menu item...",
          success: "Menu added successfully!",
          error: "Error adding menu item!",
        }
      );

      toast.success("Menu added successfully!");
      handleDialog();
    } catch (error) {
      console.error("Error adding menu:", error);
      toast.error("Error adding menu");
    }
  };

  return (
    <div>
      <ToastContainer />
      <button
        className="flex items-center gap-2 relative px-5 py-1 overflow-hidden rounded-lg bg-primary text-white transition-all duration-500 before:absolute before:inset-0 before:bg-white/20 before:scale-0 hover:before:scale-150 text-md font-semibold shadow-md shadow-stone-400"
        onClick={handleDialog}
      >
        <MdRestaurantMenu size={24} />
        Add Menu
      </button>

      <Dialog open={open} onClose={handleDialog}>
        <div className="py-5 px-5 md:px-10 border-e-8 border-primary w-[90vw] max-w-xl">
          <div className="w-full flex justify-center mb-4">
            <IconTextComponent
              text={"Add New Menu"}
              icon={<MdRestaurantMenu size={26} color="#ff6c1f" />}
            />
          </div>

          <div className="flex flex-col gap-3">
            <Input
              label="Dish Name"
              value={formData.dishName}
              onChange={(e) =>
                setFormData({ ...formData, dishName: e.target.value })
              }
            />
            {errors.dishName && (
              <p className="text-red-500 text-sm">{errors.dishName}</p>
            )}

            <Input
              label="About Dish"
              value={formData.aboutDish}
              onChange={(e) =>
                setFormData({ ...formData, aboutDish: e.target.value })
              }
            />
            {errors.aboutDish && (
              <p className="text-red-500 text-sm">{errors.aboutDish}</p>
            )}

            <Input
              label="Price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}

            <div>
              <label className="text-stone-700 font-semibold">
                Type of Dish
              </label>
              <div className="flex gap-4">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.type === true}
                      onChange={() => setFormData({ ...formData, type: true })}
                      sx={{
                        color: "gray",
                        "&.Mui-checked": { color: "#ff6c1f" },
                      }}
                    />
                  }
                  label="Veg"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.type === false}
                      onChange={() => setFormData({ ...formData, type: false })}
                      sx={{
                        color: "gray",
                        "&.Mui-checked": { color: "#ff6c1f" },
                      }}
                    />
                  }
                  label="Non Veg"
                />
              </div>
              {errors.type !== undefined && (
                <p className="text-red-500 text-sm">{errors.type}</p>
              )}
            </div>

            <div>
              <label className="text-stone-700 font-semibold">
                Category of Dish
              </label>
              <div className="flex flex-wrap gap-4">
                {["Breakfast", "Starter", "Main Course", "Beverage"].map(
                  (cat) => (
                    <FormControlLabel
                      key={cat}
                      control={
                        <Checkbox
                          checked={formData.category.includes(cat)}
                          onChange={() => handleCheckboxChange("category", cat)}
                          sx={{
                            color: "gray",
                            "&.Mui-checked": { color: "#ff6c1f" },
                          }}
                        />
                      }
                      label={cat}
                    />
                  )
                )}
              </div>
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="text-stone-700 font-semibold">Status</label>
              <div className="flex gap-4">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.availability === true}
                      onChange={() =>
                        setFormData({ ...formData, availability: true })
                      }
                      sx={{
                        color: "gray",
                        "&.Mui-checked": { color: "#ff6c1f" },
                      }}
                    />
                  }
                  label="Available"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.availability === false}
                      onChange={() =>
                        setFormData({ ...formData, availability: false })
                      }
                      sx={{
                        color: "gray",
                        "&.Mui-checked": { color: "#ff6c1f" },
                      }}
                    />
                  }
                  label="Not Available"
                />
              </div>
              {errors.availability && (
                <p className="text-red-500 text-sm">{errors.availability}</p>
              )}
            </div>

            <div className="flex flex-col lg:flex-row gap-5 items-start">
              <div>
                <Input
                  label="Upload Image"
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
                  }
                />
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image}</p>
                )}
              </div>
              <div>
                {formData.image && (
                  <img
                    src={URL.createObjectURL(formData.image)}
                    className="w-32 rounded shadow"
                    alt="selected"
                  />
                )}
              </div>
            </div>

            <Button text="ADD" onClick={handleAddMenu} />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default AddMenuComp;
