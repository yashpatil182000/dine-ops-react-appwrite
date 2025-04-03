import React from "react";

import Logo2 from "../assets/dine-ops-logo.gif";

function Logo() {
  return (
    <>
      <div className="flex items-center w-fit md:px-3">
        <img src={Logo2} width={40} alt="" className="block" />
        <p className="hidden md:block text-2xl xl:text-4xl font-extrabold text-primary font-urbanist ">
          DineOPs
        </p>
      </div>
    </>
  );
}

export default Logo;
