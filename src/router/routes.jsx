import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import SuperAdminDashboard from "../pages/super-admin/SuperAdminDashboard";
import AddRestaurant from "../pages/super-admin/AddRestaurant";

const routes = createBrowserRouter([
  { path: "", element: <Login /> },
  { path: "/super-admin-dashboard", element: <SuperAdminDashboard /> },
  { path: "/super-admin-dashboard/add-restaurant", element: <AddRestaurant /> },
]);
export default routes;
