import React, { useState } from "react";
import { BsBuildingAdd } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa6";
import { LiaHotelSolid } from "react-icons/lia";
import { SiFusionauth } from "react-icons/si";
import Input from "../Input";
import Button from "../Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ID, Query } from "appwrite";
import { account, databases } from "../../appwrite/appwriteConfig";

function AddRestaurantForm() {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // State for form fields
  const [formData, setFormData] = useState({
    restaurantName: "",
    restaurantAddress: "",
    managerName: "",
    managerPhone: "",
    managerEmail: "",
    managerPassword: "",
  });

  const [loading, setLoading] = useState(false); // ✅ Loading state

  // State for errors
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form
  const validateForm = () => {
    let newErrors = {};

    if (!formData.restaurantName.trim()) {
      newErrors.restaurantName = "Restaurant name is required";
    }
    if (!formData.restaurantAddress.trim()) {
      newErrors.restaurantAddress = "Restaurant address is required";
    }
    if (!formData.managerName.trim()) {
      newErrors.managerName = "Manager name is required";
    }
    if (!formData.managerPhone.trim() || formData.managerPhone.length !== 10) {
      newErrors.managerPhone = "Enter a valid 10-digit phone number";
    }
    if (
      !formData.managerEmail.trim() ||
      !emailRegex.test(formData.managerEmail)
    ) {
      newErrors.managerEmail = "Enter a valid email";
    }
    if (!formData.managerPassword.trim()) {
      newErrors.managerPassword = "Password is required";
    } else if (!passwordRegex.test(formData.managerPassword)) {
      newErrors.managerPassword =
        "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character";
    }

    setErrors(newErrors); // Update state

    return Object.keys(newErrors).length === 0; // ✅ Return true if no errors
  };

  const checkForDuplicate = async () => {
    try {
      // Query Appwrite Users Collection for existing email or phone
      const existingUsers = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
        [
          Query.or([
            Query.equal("email", formData.managerEmail),
            Query.equal("phone_no", formData.managerPhone),
          ]),
        ]
      );

      if (existingUsers.documents.length > 0) {
        const existingUser = existingUsers.documents[0];

        if (existingUser.email === formData.managerEmail) {
          toast.error("This email is already registered!");
          return false;
        }
        if (existingUser.phone_no === formData.managerPhone) {
          toast.error("This phone number is already in use!");
          return false;
        }
      }

      return true; // No duplicates found
    } catch (error) {
      console.error("Error checking duplicates:", error);
      toast.error("Something went wrong while checking duplicates.");
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm(); // Run validation first

    if (!isValid) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setLoading(true); // ✅ Start loading

    const isUnique = await checkForDuplicate();
    if (!isUnique) {
      setLoading(false); // ✅ Stop loading if duplicate found
      return;
    }

    try {
      // Step 1: Create Restaurant Document
      const restaurantResponse = await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_RESTAURANTS_COLLECTION_ID,
        ID.unique(),
        {
          restaurant_name: formData.restaurantName,
          manager_name: formData.managerName,
          manager_phone: formData.managerPhone,
          restaurant_address: formData.restaurantAddress,
        }
      );
      const restaurantId = restaurantResponse.$id;

      // Step 2: Register Manager in Auth
      await account.create(
        ID.unique(),
        formData.managerEmail,
        formData.managerPassword
      );

      // Step 3: Create User Document with role as "manager"
      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
        ID.unique(),
        {
          name: formData.managerName,
          email: formData.managerEmail,
          password: formData.managerPassword,
          role: "manager",
          restaurant_id: restaurantId,
          phone_no: formData.managerPhone,
        }
      );

      toast.success("Restaurant and Manager added successfully!");

      setFormData({
        restaurantName: "",
        restaurantAddress: "",
        managerName: "",
        managerPhone: "",
        managerEmail: "",
        managerPassword: "",
      });

      setErrors({}); // Clear errors
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong! Please try again.");
    }
    setLoading(false); // ✅ Stop loading
  };

  return (
    <>
      <ToastContainer />

      <div className="w-full h-fit bg-white mt-8 me-10 p-5 border-e-8 border-primary rounded-s-2xl shadow-lg shadow-stone-300">
        <form onSubmit={handleSubmit}>
          {/* Restaurant Information */}
          <div className="flex gap-1 items-center w-full">
            <LiaHotelSolid size={25} color="#606060" />
            <p className="font-bold text-primary text-lg">
              Restaurant Information
            </p>
          </div>
          <div className="w-full flex flex-col lg:flex-row gap-10 mt-5">
            <div className="w-full lg:w-[50%]">
              <Input
                label="Name"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleChange}
              />
              {errors.restaurantName && (
                <p className="text-red-500 text-sm">{errors.restaurantName}</p>
              )}
            </div>
            <div className="w-full lg:w-[50%]">
              <Input
                label="Address"
                name="restaurantAddress"
                value={formData.restaurantAddress}
                onChange={handleChange}
              />
              {errors.restaurantAddress && (
                <p className="text-red-500 text-sm">
                  {errors.restaurantAddress}
                </p>
              )}
            </div>
          </div>

          {/* Manager Information */}
          <div className="flex gap-1 items-center mt-10">
            <FaRegUser size={18} color="#606060" />
            <p className="font-bold text-primary text-lg">
              Manager Information
            </p>
          </div>
          <div className="w-full flex flex-col lg:flex-row gap-10 mt-5">
            <div className="w-full lg:w-[50%]">
              <Input
                label="Name"
                name="managerName"
                value={formData.managerName}
                onChange={handleChange}
              />
              {errors.managerName && (
                <p className="text-red-500 text-sm">{errors.managerName}</p>
              )}
            </div>
            <div className="w-full lg:w-[50%]">
              <Input
                label="Phone No."
                name="managerPhone"
                value={formData.managerPhone}
                onChange={handleChange}
              />
              {errors.managerPhone && (
                <p className="text-red-500 text-sm">{errors.managerPhone}</p>
              )}
            </div>
          </div>

          {/* Manager Credentials */}
          <div className="flex gap-1 items-center mt-10">
            <SiFusionauth size={18} color="#606060" />
            <p className="font-bold text-primary text-lg">
              Manager LogIn Credentials
            </p>
          </div>
          <div className="w-full flex flex-col lg:flex-row gap-10 mt-5">
            <div className="w-full lg:w-[50%]">
              <Input
                label="Email"
                name="managerEmail"
                value={formData.managerEmail}
                onChange={handleChange}
              />
              {errors.managerEmail && (
                <p className="text-red-500 text-sm">{errors.managerEmail}</p>
              )}
            </div>

            <div className="w-full lg:w-[50%]">
              <Input
                label="Password"
                name="managerPassword"
                value={formData.managerPassword}
                onChange={handleChange}
              />
              {errors.managerPassword && (
                <p className="text-red-500 text-sm">{errors.managerPassword}</p>
              )}
            </div>
          </div>

          <div className="w-full flex justify-center mt-10">
            <Button
              text={loading ? "Adding..." : "Add Restaurant"}
              type="submit"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default AddRestaurantForm;
