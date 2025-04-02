import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import SuperAdminDashboard from "../pages/super-admin/SuperAdminDashboard";
import AddRestaurant from "../pages/super-admin/AddRestaurant";
import ManagerDashboard from "../pages/manager/ManagerDashboard";
import ManagerTables from "../pages/manager/ManagerTables";
import ProtectedRoutes from "../components/ProtectedRoutes";
import PublicRoutes from "../components/PublicRoutes";

const routes = createBrowserRouter([
  {
    path: "",
    element: <PublicRoutes />, // Wrap Login inside PublicRoute
    children: [{ path: "", element: <Login /> }],
  },

  {
    element: <ProtectedRoutes allowedRoles={["super-admin"]} />,
    children: [
      { path: "/super-admin-dashboard", element: <SuperAdminDashboard /> },
      {
        path: "/super-admin-dashboard/add-restaurant",
        element: <AddRestaurant />,
      },
    ],
  },

  {
    element: <ProtectedRoutes allowedRoles={["manager"]} />,
    children: [
      { path: "/manager-dashboard", element: <ManagerDashboard /> },
      { path: "/manager-dashboard/tables", element: <ManagerTables /> },
    ],
  },
]);
export default routes;
