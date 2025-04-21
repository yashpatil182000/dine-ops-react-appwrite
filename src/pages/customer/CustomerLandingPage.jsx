import React from "react";
import { useSelector } from "react-redux";
import CustomerNavbar from "../../components/customer/CustomerNavbar";
import MenuCategories from "../../components/customer/MenuCategories";
function CustomerLandingPage() {
  const restaurantData = useSelector((state) => state.customer.restaurantInfo);

  return (
    <>
      <div className="w-full">
        <CustomerNavbar />
        <MenuCategories />
      </div>
    </>
  );
}

export default CustomerLandingPage;
