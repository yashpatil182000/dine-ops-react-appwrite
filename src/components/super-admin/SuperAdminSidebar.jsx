import React, { useState } from "react";
import Logo from "../Logo";
import { BsBuildingAdd } from "react-icons/bs";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineDashboard } from "react-icons/md";

import SuperAdminProfile from "../../assets/super-admin-profile.png";

import Button from "../Button";
import { account } from "../../appwrite/appwriteConfig";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../store/authSlice";

function SuperAdminSidebar() {
  const userData = useSelector((state) => state.auth.userData);
  // console.log("User from Store::", userData);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await account.deleteSession("current");
    console.log("session deleted");
    dispatch(logout());

    navigate("/");
  };

  const handleProfileMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const sidebarLink = [
    {
      path: "/super-admin-dashboard",
      name: "Dashboard",
      icon: <MdOutlineDashboard size={22} />,
    },
    {
      path: "/super-admin-dashboard/add-restaurant",
      name: "Add Restaurant",
      icon: <BsBuildingAdd size={22} />,
    },
  ];

  return (
    <>
      <div className="h-screen bg-white shadow-xl shadow-black/10 flex flex-col items-center py-3 w-[70px] md:w-[23%] transition-all duration-300 px-3">
        <div>
          <Logo />
        </div>

        <div className="flex flex-col justify-between h-[90%] w-full">
          <div className="mt-6 flex flex-col items-center md:items-start w-full">
            {sidebarLink.map((link, id) => (
              <Link to={link.path} key={id} className="w-full mb-2">
                <div
                  className={`flex items-center justify-center md:justify-start md:px-3  gap-3 py-3 rounded-lg text-gray-500 
                hover:bg-secondary hover:text-primary hover:font-semibold duration-200 
                ${
                  location.pathname === link.path
                    ? "bg-secondary text-primary font-semibold"
                    : ""
                }`}
                >
                  <span className="text-lg">{link.icon}</span>

                  <p className="hidden md:block">{link.name}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-secondary py-3 rounded-lg w-full mx-auto relative hidden md:block shadow-md shadow-stone-300 ">
            <div className="flex gap-2 justify-center">
              <div
                className="mt-2 md:mt-1 md:pointer-events-none drop-shadow-xl absolute -top-18 left-auto"
                onClick={handleProfileMenu}
              >
                {" "}
                <img
                  src={SuperAdminProfile}
                  className="mt-9 lg:mt-0 w-16 lg:w-24"
                  alt=""
                />
              </div>
              <p className="mt-7 lg:mt-5 text-center hidden md:block md:text-sm font-bold text-stone-600 uppercase">
                {userData && userData.name}
              </p>
            </div>
            <div className="mb-1 lg:mb-0">
              <p className="text-center hidden md:block md:text-sm capitalize font-semibold text-stone-500 ">
                {userData && userData.role}
              </p>
            </div>

            <div className="hidden md:flex justify-center w-full mt-2 lg:mt-4 ">
              <Button
                text="LOG OUT"
                bgColor="bg-stone-800"
                onClick={handleLogout}
              />
            </div>
          </div>
          {/*---------Profile Menu-----------*/}
          <div
            className="block md:hidden relative mb-8 md:pointer-events-none drop-shadow-xl"
            onClick={handleProfileMenu}
          >
            {" "}
            <img src={SuperAdminProfile} className="w-24" alt="" />
            <div
              className={`absolute -top-15 -right-48 bg-secondary py-2 px-5 rounded-lg z-0  shadow-xl shadow-black/10
                 transition-opacity duration-300 ease-in-out ${
                   isOpen
                     ? "opacity-100 scale-100"
                     : "opacity-0 invisible scale-95 pointer-events-none"
                 }`}
            >
              <div className="">
                <p className="text-md text-center font-bold text-stone-600 uppercase">
                  {userData && userData.name}
                </p>
              </div>
              <div className="">
                <p className="text-center text-sm mb-2 capitalize font-semibold text-stone-500 ">
                  {userData && userData.role}
                </p>
              </div>

              <div className="ms-5 mt-2">
                <Button
                  text="LOG OUT"
                  bgColor="bg-stone-800"
                  onClick={handleLogout}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuperAdminSidebar;
