import React from "react";

function Button({ text, textColor = "text-white", bgColor = "bg-primary" }) {
  return (
    <>
      <button
        className={`relative px-5 py-1 overflow-hidden rounded-lg ${bgColor} ${textColor} transition-all duration-500 before:absolute before:inset-0 before:bg-white/20 before:scale-0 hover:before:scale-150`}
      >
        {text || "Button"}
      </button>
    </>
  );
}

export default Button;
