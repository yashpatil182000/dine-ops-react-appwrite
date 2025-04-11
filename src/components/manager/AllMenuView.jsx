import React, { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import { useSelector } from "react-redux";
import { databases, storage } from "../../appwrite/appwriteConfig";
import { Query, ID } from "appwrite";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Input from "../Input";
import Button from "../Button";
import { toast, ToastContainer } from "react-toastify";

function AllMenuView({ refreshTrigger }) {
  const restaurantData = useSelector(
    (state) => state.restaurant.restaurantData
  );

  const [menuList, setMenuList] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const fetchMenu = async () => {
    try {
      const result = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_MENU_COLLECTION_ID,
        [Query.equal("restaurant_id", restaurantData.$id)]
      );
      if (result.documents.length > 0) {
        setMenuList(result.documents);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [refreshTrigger]);

  const handleCardClick = (menu) => {
    setSelectedMenu(menu);
    setPreviewImage(menu.imgURL.replace("/preview", "/view"));
    setOpenEditDialog(true);
  };

  const handleDialogClose = () => {
    setOpenEditDialog(false);
    setSelectedMenu(null);
    setNewImageFile(null);
    setPreviewImage(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectedMenu((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    try {
      const toastId = toast.loading("Updating Menu...");

      let updatedFields = {
        dish_name: selectedMenu.dish_name,
        dish_description: selectedMenu.dish_description,
        price: selectedMenu.price,
        isVeg: selectedMenu.isVeg,
        categories: selectedMenu.categories,
        available: selectedMenu.available,
      };

      // Upload new image if selected
      if (newImageFile) {
        const uploadedFile = await storage.createFile(
          import.meta.env.VITE_APPWRITE_MENU_IMAGE_BUCKET_ID,
          ID.unique(),
          newImageFile
        );

        const imgURL = storage.getFilePreview(
          import.meta.env.VITE_APPWRITE_MENU_IMAGE_BUCKET_ID,
          uploadedFile.$id
        ).href;

        updatedFields.imgURL = imgURL;
      }

      // Update the document with updated fields (conditionally includes imgURL)
      await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_MENU_COLLECTION_ID,
        selectedMenu.$id,
        updatedFields
      );

      handleDialogClose();
      toast.update(toastId, {
        render: "Menu updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      fetchMenu(); // Refresh menu list
    } catch (error) {
      toast.error("Error Updating Menu");
      console.log("Error updating menu:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-[92%] lg:w-[98%] flex flex-wrap gap-5">
        {menuList.map((menu, index) => (
          <div key={index} onClick={() => handleCardClick(menu)}>
            <MenuCard
              name={menu?.dish_name}
              imageURL={menu?.imgURL.replace("/preview", "/view")}
              iconColor={menu?.isVeg ? "#1D9825" : "#98361D"}
            />
          </div>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleDialogClose}>
        <DialogTitle>Edit Menu</DialogTitle>
        <DialogContent className="flex flex-col gap-3 mt-2">
          <Input
            name="dish_name"
            label="Dish Name"
            value={selectedMenu?.dish_name || ""}
            onChange={handleInputChange}
          />
          <Input
            name="dish_description"
            label="Description"
            value={selectedMenu?.dish_description || ""}
            onChange={handleInputChange}
          />
          <Input
            name="price"
            label="Price"
            type="number"
            value={selectedMenu?.price || ""}
            onChange={handleInputChange}
          />

          {/* Type */}
          <div>
            <p className="text-stone-700 font-semibold">Type of Dish</p>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "gray",
                    "&.Mui-checked": { color: "#ff6c1f" },
                  }}
                  checked={selectedMenu?.isVeg === true}
                  onChange={() =>
                    setSelectedMenu((prev) => ({ ...prev, isVeg: true }))
                  }
                />
              }
              label="Veg"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "gray",
                    "&.Mui-checked": { color: "#ff6c1f" },
                  }}
                  checked={selectedMenu?.isVeg === false}
                  onChange={() =>
                    setSelectedMenu((prev) => ({ ...prev, isVeg: false }))
                  }
                />
              }
              label="Non Veg"
            />
          </div>

          {/* Categories */}
          <div>
            <p className="text-stone-700 font-semibold mb-2">
              Category of Dish
            </p>
            {["Breakfast", "Starter", "Main Course", "Beverage"].map(
              (category) => (
                <FormControlLabel
                  key={category}
                  control={
                    <Checkbox
                      sx={{
                        color: "gray",
                        "&.Mui-checked": { color: "#ff6c1f" },
                      }}
                      checked={(selectedMenu?.categories || []).includes(
                        category
                      )}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setSelectedMenu((prev) => {
                          const current = prev.categories || [];
                          return {
                            ...prev,
                            categories: isChecked
                              ? [...current, category]
                              : current.filter((c) => c !== category),
                          };
                        });
                      }}
                    />
                  }
                  label={category}
                />
              )
            )}
          </div>

          {/* Availability */}
          <div>
            <p className="text-stone-700 font-semibold">Status</p>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "gray",
                      "&.Mui-checked": { color: "#ff6c1f" },
                    }}
                    checked={selectedMenu?.available === true}
                    onChange={() =>
                      setSelectedMenu((prev) => ({
                        ...prev,
                        available: true,
                      }))
                    }
                  />
                }
                label="Available"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "gray",
                      "&.Mui-checked": { color: "#ff6c1f" },
                    }}
                    checked={selectedMenu?.available === false}
                    onChange={() =>
                      setSelectedMenu((prev) => ({
                        ...prev,
                        available: false,
                      }))
                    }
                  />
                }
                label="Not Available"
              />
            </div>
          </div>

          {/* Image */}
          {/* Image Upload + Preview */}
          <div>
            <p className="font-semibold text-stone-700 mb-1">Current Image</p>
            <Input type="file" onChange={handleImageChange} />

            {previewImage && (
              <img
                src={previewImage}
                className="w-32 rounded shadow mt-2"
                alt="Preview"
              />
            )}
          </div>
        </DialogContent>

        <DialogActions>
          <Button
            text={"Cancel"}
            bgColor="bg-stone-300"
            textColor="text-stone-900"
            onClick={handleDialogClose}
          />
          <Button text={"Update"} onClick={handleUpdate} />
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AllMenuView;
