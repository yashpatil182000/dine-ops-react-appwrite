import React, { useState } from "react";
import Logo from "../Logo";

import {
  MdOutlineDashboard,
  MdOutlineTableRestaurant,
  MdOutlinePerson,
  MdRestaurantMenu,
  MdOutlinePayment,
  MdGroups,
} from "react-icons/md";
import { TbInvoice } from "react-icons/tb";
import { LuChefHat } from "react-icons/lu";
import { IoIosArrowDropright } from "react-icons/io";

import ManagerProfile from "../../assets/manager-profile2.png";

import Button from "../Button";
import { account } from "../../appwrite/appwriteConfig";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { clearRestaurant } from "../../store/restaurantSlice";

function ManagerSidebar() {
  const userData = useSelector((state) => state.auth.userData);
  const restaurantData = useSelector(
    (state) => state.restaurant.restaurantData
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await account.deleteSession("current");
    console.log("session deleted");
    dispatch(logout());
    dispatch(clearRestaurant());

    navigate("/");
  };

  const handleProfileMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const sidebarLink = [
    {
      path: "/manager-dashboard",
      name: "Dashboard",
      icon: <MdOutlineDashboard size={22} />,
    },
    {
      path: "/manager-dashboard/tables",
      name: "Tables",
      icon: <MdOutlineTableRestaurant size={22} />,
    },
    // {
    //   path: "/manager-dashboard/waiters",
    //   name: "Waiters",
    //   icon: <MdOutlinePerson size={22} />,
    // },
    {
      path: "/manager-dashboard/menu",
      name: "Menu",
      icon: <MdRestaurantMenu size={22} />,
    },
    {
      path: "/manager-dashboard/orders",
      name: "Orders",
      icon: <TbInvoice size={22} />,
    },
    // {
    //   path: "/manager-dashboard/payments",
    //   name: "Payments",
    //   icon: <MdOutlinePayment size={22} />,
    // },
  ];

  const [staffOpen, setStaffOpen] = useState(false);

  return (
    <>
      <div
        className="h-screen bg-white shadow-xl shadow-black/10 flex flex-col items-center py-3  
      w-[70px] md:w-[23%] transition-all duration-300 px-3"
      >
        <div>
          <Logo />
        </div>

        <div className="flex flex-col justify-between h-[93%] w-full">
          <div className="mt-6 flex flex-col items-center md:items-start w-full">
            {sidebarLink.map((link, id) => (
              <Link to={link.path} key={id} className="w-full mb-2">
                <div
                  className={`flex items-center justify-center md:justify-start md:px-3  gap-3 py-2 rounded-lg text-gray-500 
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
            {/* ---- Staff Link ---- */}
            <div className="w-full mb-2">
              <div
                onClick={() => setStaffOpen(!staffOpen)}
                className={`flex items-center justify-center md:justify-start md:px-3 gap-3 py-2 rounded-lg text-gray-500 hover:bg-secondary hover:text-primary hover:font-semibold duration-200 cursor-pointer
                ${
                  location.pathname.includes("/manager-dashboard/waiters") ||
                  location.pathname.includes("/manager-dashboard/kitchen")
                    ? "bg-secondary text-primary font-semibold"
                    : ""
                }`}
              >
                <span className="text-lg">
                  <MdGroups size={22} />
                </span>
                <p className="hidden md:block">Staff</p>
                <span
                  className="ml-auto hidden md:block transition-transform duration-300"
                  style={{
                    transform: staffOpen ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                >
                  <IoIosArrowDropright size={22} />
                </span>
              </div>

              <div
                className={`md:ml-6 lg:ml-8 overflow-hidden transition-all duration-300 ease-in-out 
                            ${
                              staffOpen
                                ? "max-h-40 opacity-100 scale-100"
                                : "max-h-0 opacity-0 scale-95"
                            }`}
              >
                <div className="mt-1 flex flex-col gap-1 text-sm text-gray-600">
                  <Link to="/manager-dashboard/waiters">
                    <div
                      className={`flex items-center justify-center md:justify-start md:px-3  gap-3 py-2 rounded-lg text-gray-500 
                  hover:bg-secondary hover:text-primary hover:font-semibold duration-200 
                  ${
                    location.pathname === "/manager-dashboard/waiters"
                      ? "bg-secondary text-primary font-semibold"
                      : ""
                  }`}
                    >
                      <span className="text-lg">
                        <MdOutlinePerson size={22} />
                      </span>

                      <p className="hidden md:block">Waiters</p>
                    </div>
                  </Link>
                  <Link to="/manager-dashboard/kitchen">
                    <div
                      className={`flex items-center justify-center md:justify-start md:px-3  gap-3 py-2 rounded-lg text-gray-500 
                  hover:bg-secondary hover:text-primary hover:font-semibold duration-200 
                  ${
                    location.pathname === "/manager-dashboard/kitchen"
                      ? "bg-secondary text-primary font-semibold"
                      : ""
                  }`}
                    >
                      <span className="text-lg">
                        <LuChefHat size={22} />
                      </span>

                      <p className="hidden md:block">Kitchen</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-secondary py-3 rounded-lg w-full mx-auto relative hidden md:block shadow-md shadow-stone-300 ">
            <div className="flex gap-2 justify-center">
              <div
                className="mt-2 md:mt-1 md:pointer-events-none drop-shadow-xl absolute -top-18 left-auto"
                onClick={handleProfileMenu}
              >
                {" "}
                <img
                  src={ManagerProfile}
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
            <div className="w-full text-center lg:mt-2 drop-shadow-md">
              <p className="text-primary font-extrabold text-md px-1 lg:text-2xl hidden md:block">
                {restaurantData && restaurantData.restaurant_name}
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
            <img src={ManagerProfile} className="w-24" alt="" />
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
              <div className="w-full text-center drop-shadow-md">
                <p className="text-primary font-extrabold text-lg">
                  {restaurantData && restaurantData.restaurant_name}
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

export default ManagerSidebar;
