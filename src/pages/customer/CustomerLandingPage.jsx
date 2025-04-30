import React from "react";
import { useSelector } from "react-redux";
import CustomerNavbar from "../../components/customer/CustomerNavbar";
import MenuCategories from "../../components/customer/MenuCategories";
import CartOverview from "../../components/customer/CartOverview";
function CustomerLandingPage() {
  const cartData = useSelector((state) => state.cart.cart);

  return (
    <>
      <div className="w-full">
        <CustomerNavbar />

        <MenuCategories />
        {cartData.length > 0 && (
          <div className="w-full fixed bottom-0">
            <CartOverview count={cartData.length} />
          </div>
        )}
      </div>
    </>
  );
}

export default CustomerLandingPage;
