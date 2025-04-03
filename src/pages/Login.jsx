import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { BiLogIn } from "react-icons/bi";
import Logo2 from "../assets/dine-ops-logo.gif";

import { account, databases } from "../appwrite/appwriteConfig";
import { Query } from "appwrite";
import { toast, ToastContainer } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { setRestaurant } from "../store/restaurantSlice";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState({ emailError: "", passwordError: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const startSession = async () => {
    try {
      await account.createEmailPasswordSession(user.email, user.password);
      return true;
    } catch (error) {
      console.log("session error :: ", error);
      return false;
    }
  };

  const handleLogin = async () => {
    setError({ emailError: "", passwordError: "" }); // Reset errors before validation

    if (!user.email || !user.password) {
      toast.error("Input fields cannot be empty.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!emailRegex.test(user.email) || !passwordRegex.test(user.password)) {
      setError({
        emailError: !emailRegex.test(user.email) ? "Enter Valid Email" : "",
        passwordError: !passwordRegex.test(user.password)
          ? "Enter Valid Password"
          : "",
      });
      return;
    }

    try {
      const sessionStarted = await startSession();

      if (!sessionStarted) {
        toast.error("Incorrect Email or Password", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
        [Query.equal("email", user.email)]
      );

      if (response.documents.length > 0) {
        const loggedinUser = response.documents[0];
        dispatch(login(loggedinUser));

        if (loggedinUser.role === "super-admin") {
          navigate("/super-admin-dashboard");
          return;
        }

        if (loggedinUser.role !== "super-admin") {
          try {
            const restaurantResponse = await databases.listDocuments(
              import.meta.env.VITE_APPWRITE_DATABASE_ID,
              import.meta.env.VITE_APPWRITE_RESTAURANTS_COLLECTION_ID,
              [Query.equal("$id", loggedinUser.restaurant_id)]
            );

            if (restaurantResponse.documents.length > 0) {
              const restaurantInfo = restaurantResponse.documents[0];
              dispatch(setRestaurant(restaurantInfo));
            }
          } catch (error) {
            console.log("Error Fetching Restaurant :: ", error);
          }
          navigate("/manager-dashboard");
        }
      } else {
        toast.error("No user found with this email.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log("Error::", error);
    }
  };

  const userData = useSelector((state) => state.auth.userData);

  if (userData) {
    return (
      <Navigate
        to={
          userData.role === "super-admin"
            ? "/super-admin-dashboard"
            : "/manager-dashboard"
        }
        replace
      />
    );
  }

  return (
    <>
      <div className="w-full h-screen bg-secondaryLight  flex justify-center">
        <ToastContainer />
        <div className="mt-32 h-fit bg-white w-[90%] md:w-[45%] pt-5 pb-12 border-e-8 border-primary rounded-s-2xl shadow-lg shadow-stone-300">
          <div className="flex flex-col items-center gap-5">
            <div className="w-[65%] flex justify-center  mb-4">
              <div className="flex items-center w-fit md:px-3">
                <img src={Logo2} width={40} alt="" className="block" />
                <p className="text-4xl font-extrabold text-primary font-urbanist ">
                  DineOPs
                </p>
              </div>
            </div>
            <div className="w-[85%] md:w-[65%] flex items-center gap-2">
              <span>
                <BiLogIn size={25} fontWeight={55} color="#ff6c1f" />
              </span>
              <p className="font-bold text-xl text-stone-600">Log in</p>
            </div>
            <div className="w-[85%] md:w-[65%]">
              <Input
                label={"Email"}
                name="email"
                placeholder={"Enter Email Here"}
                type={"text"}
                value={user.email}
                onChange={handleChange}
              />
              {error.emailError && (
                <p className="text-red-500">{error.emailError}</p>
              )}
            </div>
            <div className="w-[85%] md:w-[65%]">
              <Input
                label={"Password"}
                name="password"
                placeholder={"Enter Password Here"}
                type={"password"}
                value={user.password}
                onChange={handleChange}
              />
              {error.passwordError && (
                <p className="text-red-500">{error.passwordError}</p>
              )}
            </div>
            <div className="w-[85%] md:w-[65%]">
              <Button text={"Login"} onClick={handleLogin} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
