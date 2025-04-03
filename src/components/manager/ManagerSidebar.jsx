import React, { useState } from "react";
import Logo from "../Logo";
import { BsBuildingAdd } from "react-icons/bs";
import { FaRegCircleUser } from "react-icons/fa6";
import {
  MdOutlineDashboard,
  MdOutlineTableRestaurant,
  MdOutlinePerson,
  MdRestaurantMenu,
  MdOutlinePayment,
} from "react-icons/md";
import { TbInvoice } from "react-icons/tb";

import Button from "../Button";
import { account } from "../../appwrite/appwriteConfig";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { clearRestaurant } from "../../store/restaurantSlice";

function ManagerSidebar() {
  const userData = useSelector((state) => state.auth.userData);

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
    {
      path: "",
      name: "Waiters",
      icon: <MdOutlinePerson size={22} />,
    },
    {
      path: "",
      name: "Menu",
      icon: <MdRestaurantMenu size={22} />,
    },
    {
      path: "",
      name: "Orders",
      icon: <TbInvoice size={22} />,
    },
    {
      path: "",
      name: "Payments",
      icon: <MdOutlinePayment size={22} />,
    },
  ];

  return (
    <>
      <div
        className="h-screen bg-white shadow-xl shadow-black/10 flex flex-col items-center py-3  
      w-[70px] md:w-[23%] transition-all duration-300 px-3"
      >
        <div>
          <Logo />
        </div>

        <div className="flex flex-col justify-between h-[90%] w-full">
          <div className="mt-10 flex flex-col items-center md:items-start w-full">
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

          <div className="bg-secondary p-3 rounded-lg w-full px-3 mx-auto relative ">
            <div className="flex gap-2 justify-center md:justify-start">
              <div
                className="mt-2 md:mt-1 md:pointer-events-none"
                onClick={handleProfileMenu}
              >
                <FaRegCircleUser color="#ff6c1f" size={22} />
              </div>
              <p className="hidden md:block md:text-md font-bold text-stone-600 uppercase">
                {userData && userData.name}
              </p>
            </div>
            <div className="">
              <p className="hidden md:block md:ms-7 lg:ms-8 md:text-sm capitalize font-semibold text-stone-500 ">
                {userData && userData.role}
              </p>
            </div>
            <div className="hidden md:block ms-7 mt-4 ">
              <Button text="logout" onClick={handleLogout} />
            </div>

            {/*---------Profile Menu-----------*/}
            <div
              className={`absolute -top-10 -right-48 bg-secondary py-2 px-5 rounded-lg z-0  shadow-xl shadow-black/10
                 transition-opacity duration-300 ease-in-out ${
                   isOpen
                     ? "opacity-100 scale-100"
                     : "opacity-0 invisible scale-95 pointer-events-none"
                 }`}
            >
              <div className="flex gap-2 items-center justify-center md:justify-start">
                <div className="">
                  <FaRegCircleUser color="#ff6c1f" size={16} />
                </div>
                <p className=" md:text-md font-bold text-stone-600 uppercase">
                  {userData && userData.name}
                </p>
              </div>
              <div className="">
                <p className="ms-6 text-sm capitalize font-semibold text-stone-500 ">
                  {userData && userData.role}
                </p>
              </div>
              <div className="ms-5 mt-3">
                <Button text="logout" onClick={handleLogout} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagerSidebar;
