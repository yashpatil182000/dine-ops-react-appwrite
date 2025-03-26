import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import SuperAdminDashboard from "../pages/super-admin/SuperAdminDashboard";

const routes = createBrowserRouter([
  { path: "", element: <Login /> },
  { path: "/super-admin-dashboard", element: <SuperAdminDashboard /> },
]);
export default routes;
