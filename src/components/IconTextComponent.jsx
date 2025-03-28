import React from "react";

function IconTextComponent({ icon, text }) {
  return (
    <>
      <div className="flex gap-2 items-center">
        <span>{icon}</span>
        <p className="font-urbanist font-semibold text-stone-500 text-2xl">
          {text}
        </p>
      </div>
    </>
  );
}

export default IconTextComponent;
