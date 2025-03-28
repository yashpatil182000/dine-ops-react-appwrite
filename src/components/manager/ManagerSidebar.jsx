import React from "react";
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

function ManagerSidebar() {
  const userData = useSelector((state) => state.auth.userData);
  console.log("User from Store::", userData);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = async () => {
    await account.deleteSession("current");
    console.log("session deleted");
    dispatch(logout());

    navigate("/");
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
      <div className="h-screen bg-white w-[23%] shadow-xl shadow-black/10 flex flex-col  items-center py-3">
        <Logo />
        <div className="flex flex-col justify-between h-[90%] w-[85%]">
          <div className="mt-10">
            {sidebarLink.map((link, id) => (
              <Link to={link.path} key={id}>
                <div
                  className={`flex mb-3 items-center gap-2 px-5 py-2 rounded-lg text-gray-500 hover:bg-secondary hover:text-primary hover:font-semibold duration-200 ${
                    location.pathname == link.path
                      ? "bg-secondary text-primary font-semibold"
                      : null
                  }`}
                >
                  <span>{link.icon}</span>

                  <p>{link.name}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-secondary p-3 rounded-lg">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <FaRegCircleUser color="#ff6c1f" size={25} />
              <p>{userData && userData.name}</p>
            </div>
            <div className="mt-2 ms-8 mb-5 text-sm text-gray-600">
              <p>{userData && userData.role}</p>
            </div>
            <div>
              <Button text="logout" onClick={handleLogout} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagerSidebar;
