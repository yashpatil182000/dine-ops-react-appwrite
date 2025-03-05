import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { BiLogIn } from "react-icons/bi";

import Logo from "../components/Logo";

function Login() {
  return (
    <>
      <div className="w-full h-screen bg-secondaryLight  flex justify-center">
        <div className="mt-32 h-fit bg-white w-[90%] md:w-[45%] pt-5 pb-12 border-e-8 border-primary rounded-s-2xl shadow-lg shadow-stone-300">
          <div className="flex flex-col items-center gap-5">
            <div className="w-[65%] flex justify-center  mb-4">
              <Logo />
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
                placeholder={"Enter Email Here"}
                type={"text"}
              />
            </div>
            <div className="w-[85%] md:w-[65%]">
              <Input
                label={"Password"}
                placeholder={"Enter Password Here"}
                type={"password"}
              />
            </div>
            <div className="w-[85%] md:w-[65%]">
              <Button text={"Login"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
