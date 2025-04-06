import React, { useState } from "react";
import { MdOutlinePersonAdd } from "react-icons/md";
import Dialog from "@mui/material/Dialog";
import Input from "../Input";
import IconTextComponent from "../IconTextComponent";
import Button from "../Button";
import { useSelector } from "react-redux";
import { ID } from "appwrite";
import { databases, account } from "../../appwrite/appwriteConfig";
import { toast, ToastContainer } from "react-toastify";

function AddWaiterComp() {
  const restaurantData = useSelector(
    (state) => state.restaurant.restaurantData
  );
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    managerName: "",
    managerPhone: "",
    managerEmail: "",
    managerPassword: "",
  });

  const [errors, setErrors] = useState({});

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleDialog = () => {
    setOpen((prev) => !prev);
    setFormData({
      managerName: "",
      managerPhone: "",
      managerEmail: "",
      managerPassword: "",
    });
    setErrors({});
  };

  const handleChange = (label, value) => {
    setFormData({ ...formData, [label]: value });
    setErrors({ ...errors, [label]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.managerName.trim())
      newErrors.managerName = "Name is required";
    if (!formData.managerPhone.trim())
      newErrors.managerPhone = "Phone number is required";
    else if (formData.managerPhone.length < 10)
      newErrors.managerPhone = "Enter a valid phone number";

    if (!emailRegex.test(formData.managerEmail))
      newErrors.managerEmail = "Enter a valid email";
    if (!passwordRegex.test(formData.managerPassword))
      newErrors.managerPassword =
        "Password must contain uppercase, lowercase, number, special char and be 8+ chars long";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleAddWaiter = async () => {
    if (!validateForm()) return;

    try {
      await account.create(
        ID.unique(),
        formData.managerEmail,
        formData.managerPassword
      );

      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
        ID.unique(),
        {
          name: formData.managerName,
          email: formData.managerEmail,
          password: formData.managerPassword,
          role: "waiter",
          restaurant_id: restaurantData.$id,
          phone_no: formData.managerPhone,
        }
      );

      toast.success("Waiter added successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      handleDialog(); // Close dialog on success
    } catch (error) {
      toast.error("Error adding waiter", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Error adding waiter:", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <button
        className="flex items-center gap-2 relative px-5 py-1 overflow-hidden rounded-lg bg-primary text-white transition-all duration-500 before:absolute before:inset-0 before:bg-white/20 before:scale-0 hover:before:scale-150 text-md font-semibold shadow-md shadow-stone-400"
        onClick={handleDialog}
      >
        <MdOutlinePersonAdd size={24} />
        Add Waiter
      </button>

      <Dialog open={open} onClose={handleDialog}>
        <div className="py-5 px-5 md:px-10 border-e-8 border-primary">
          <div className="w-full flex justify-center">
            <IconTextComponent
              text={"Add New Waiter"}
              icon={<MdOutlinePersonAdd size={26} color="#ff6c1f" />}
            />
          </div>
          <div className="my-6 lg:w-96 flex flex-col gap-3">
            <div>
              <Input
                label={"Name"}
                value={formData.managerName}
                onChange={(e) => handleChange("managerName", e.target.value)}
              />
              {errors.managerName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.managerName}
                </p>
              )}
            </div>

            <div>
              <Input
                label={"Phone number"}
                value={formData.managerPhone}
                onChange={(e) => handleChange("managerPhone", e.target.value)}
              />
              {errors.managerPhone && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.managerPhone}
                </p>
              )}
            </div>

            <div>
              <Input
                label={"Email"}
                value={formData.managerEmail}
                onChange={(e) => handleChange("managerEmail", e.target.value)}
              />
              {errors.managerEmail && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.managerEmail}
                </p>
              )}
            </div>

            <div>
              <Input
                label={"Password"}
                type="text"
                value={formData.managerPassword}
                onChange={(e) =>
                  handleChange("managerPassword", e.target.value)
                }
              />
              {errors.managerPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.managerPassword}
                </p>
              )}
            </div>

            <Button text={"ADD"} onClick={handleAddWaiter} />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default AddWaiterComp;
