import { Dialog } from "@mui/material";
import React, { useState } from "react";
import { LuChefHat } from "react-icons/lu";
import { toast, ToastContainer } from "react-toastify";
import IconTextComponent from "../IconTextComponent";
import { useSelector } from "react-redux";
import Input from "../Input";
import Button from "../Button";
import { account, databases } from "../../appwrite/appwriteConfig";
import { ID } from "appwrite";

function AddKitchenComp({ onKitchenUserAdded }) {
  const restaurantData = useSelector(
    (state) => state.restaurant.restaurantData
  );
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    kitchenUserName: "",
    kitchenUserPhone: "",
    kitchenUserEmail: "",
    kitchenUserPassword: "",
  });

  const [errors, setErrors] = useState({});

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleDialog = () => {
    setOpen((prev) => !prev);
    setFormData({
      kitchenUserName: "",
      kitchenUserPhone: "",
      kitchenUserEmail: "",
      kitchenUserPassword: "",
    });
    setErrors({});
  };

  const handleChange = (label, value) => {
    setFormData({ ...formData, [label]: value });
    setErrors({ ...errors, [label]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.kitchenUserName.trim())
      newErrors.kitchenUserName = "Name is required";
    if (!formData.kitchenUserPhone.trim())
      newErrors.kitchenUserPhone = "Phone number is required";
    else if (formData.kitchenUserPhone.length < 10)
      newErrors.kitchenUserPhone = "Enter a valid phone number";

    if (!emailRegex.test(formData.kitchenUserEmail))
      newErrors.kitchenUserEmail = "Enter a valid email";
    if (!passwordRegex.test(formData.kitchenUserPassword))
      newErrors.kitchenUserPassword =
        "Password must contain uppercase, lowercase, number, special char and be 8+ chars long";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleAddKitchenUser = async () => {
    if (!validateForm()) return;

    try {
      await account.create(
        ID.unique(),
        formData.kitchenUserEmail,
        formData.kitchenUserPassword
      );

      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
        ID.unique(),
        {
          name: formData.kitchenUserName,
          email: formData.kitchenUserEmail,
          password: formData.kitchenUserPassword,
          role: "kitchen",
          restaurant_id: restaurantData.$id,
          phone_no: formData.kitchenUserPhone,
        }
      );

      toast.success("Kitchen staff added successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      handleDialog(); // Close dialog on success
      onKitchenUserAdded();
    } catch (error) {
      toast.error("Error adding Kitchen Staff", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Error adding Kitchen Staff:", error);
    }
  };

  return (
    <>
      <div>
        <ToastContainer />
        <button
          className="flex items-center gap-2 relative px-5 py-1 overflow-hidden rounded-lg bg-primary text-white transition-all duration-500 before:absolute before:inset-0 before:bg-white/20 before:scale-0 hover:before:scale-150 text-md font-semibold shadow-md shadow-stone-400"
          onClick={handleDialog}
        >
          <LuChefHat size={24} /> Add Kitchen Staff
        </button>

        <Dialog open={open} onClose={handleDialog}>
          <div className="py-5 px-5 md:px-10 border-e-8 border-primary">
            <div className="w-full flex justify-center">
              <IconTextComponent
                text={"Add New Kitchen Staff"}
                icon={<LuChefHat size={26} color="#ff6c1f" />}
              />
            </div>
            <div className="my-6 lg:w-96 flex flex-col gap-3">
              <div>
                <Input
                  label={"Name"}
                  value={formData.kitchenUserName}
                  onChange={(e) =>
                    handleChange("kitchenUserName", e.target.value)
                  }
                />
                {errors.kitchenUserName && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.kitchenUserName}
                  </p>
                )}
              </div>

              <div>
                <Input
                  label={"Phone number"}
                  value={formData.kitchenUserPhone}
                  onChange={(e) =>
                    handleChange("kitchenUserPhone", e.target.value)
                  }
                />
                {errors.kitchenUserPhone && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.kitchenUserPhone}
                  </p>
                )}
              </div>

              <div>
                <Input
                  label={"Email"}
                  value={formData.kitchenUserEmail}
                  onChange={(e) =>
                    handleChange("kitchenUserEmail", e.target.value)
                  }
                />
                {errors.kitchenUserEmail && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.kitchenUserEmail}
                  </p>
                )}
              </div>

              <div>
                <Input
                  label={"Password"}
                  type="text"
                  value={formData.kitchenUserPassword}
                  onChange={(e) =>
                    handleChange("kitchenUserPassword", e.target.value)
                  }
                />
                {errors.kitchenUserPassword && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.kitchenUserPassword}
                  </p>
                )}
              </div>

              <Button text={"ADD"} onClick={handleAddKitchenUser} />
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
}

export default AddKitchenComp;
