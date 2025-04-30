import React, { useState } from "react";
import IconTextComponent from "../IconTextComponent";
import { MdLogin } from "react-icons/md";
import Input from "../Input";
import Button from "../Button";
import { ToastContainer, toast } from "react-toastify";
import { account, databases } from "../../appwrite/appwriteConfig";
import { ID, Query } from "appwrite";
import OTPInput from "./OtpInput";
import { IconButton } from "@mui/material";
import { MdOutlineEdit } from "react-icons/md";

function CustomerLoginComp() {
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [disableInput, setDisableInput] = useState(false);

  const OTP = "00000";

  const handleSendOTP = () => {
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    setShowOTPInput(true);
    setDisableInput(true);
  };

  const handleVerifyOTP = () => {
    if (!otp) {
      toast.error("Please Enter OTP first");
      return;
    }
    if (otp === OTP) {
      toast.success("OTP verified");
    } else {
      toast.error("Invalid OTP");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-[90%] mx-auto bg-white flex flex-col items-center gap-5 mt-24 rounded-xl shadow-lg shadow-black/10 p-5">
        <div>
          <IconTextComponent
            text={"Customer Login"}
            icon={<MdLogin size={20} color="#ff6c1f" />}
          />
        </div>
        <div className="relative">
          <Input
            label={"Enter Phone Number"}
            type={"text"}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={disableInput}
          />
          {disableInput && (
            <div className="absolute top-7 right-0">
              <IconButton
                aria-label="delete"
                onClick={() => {
                  setDisableInput(false);
                }}
              >
                <MdOutlineEdit />
              </IconButton>
            </div>
          )}
        </div>
        {showOTPInput && (
          <div className="w-[40%]">
            <label className="text-stone-700 font-semibold"> Enter OTP </label>
            <OTPInput length={5} onChange={(value) => setOtp(value)} />
          </div>
        )}
        <div>
          <Button
            text={!showOTPInput ? "Send OTP" : "Verify and Login"}
            onClick={!showOTPInput ? handleSendOTP : handleVerifyOTP}
          />
        </div>
      </div>
    </>
  );
}

export default CustomerLoginComp;
