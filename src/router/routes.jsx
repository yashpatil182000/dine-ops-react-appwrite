import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import SuperAdminDashboard from "../pages/super-admin/SuperAdminDashboard";
import AddRestaurant from "../pages/super-admin/AddRestaurant";
import ManagerDashboard from "../pages/manager/ManagerDashboard";
import ManagerTables from "../pages/manager/ManagerTables";

const routes = createBrowserRouter([
  { path: "", element: <Login /> },
  { path: "/super-admin-dashboard", element: <SuperAdminDashboard /> },
  { path: "/super-admin-dashboard/add-restaurant", element: <AddRestaurant /> },
  { path: "/manager-dashboard", element: <ManagerDashboard /> },
  { path: "/manager-dashboard/tables", element: <ManagerTables /> },
]);
export default routes;
