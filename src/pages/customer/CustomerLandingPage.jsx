import React from "react";
import { useLocation, useParams } from "react-router-dom";

function CustomerLandingPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const restaurantId = params.get("restaurantId");
  const table = params.get("table");


  return <>Customer Landing Page</>;
}

export default CustomerLandingPage;
