import React from "react";

function Input({ label, placeholder, type }) {
  return (
    <>
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="" className="text-stone-700 font-semibold">
          {label}
        </label>
        <input
          type={type || "text"}
          placeholder={placeholder}
          className="bg-secondaryLight rounded-lg px-5 py-1 text-gray-600 border-1 border-gray-300 focus:border-primary focus:ring-primary outline-none"
        />
      </div>
    </>
  );
}

export default Input;
