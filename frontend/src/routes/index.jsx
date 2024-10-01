import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Login } from "../pages/Login";
import Register from "../pages/Register";
import AuthUser from "../component/AuthUser";
import Admin from "../admin/pages/Admin";
import Dashboard from "../admin/pages/Dashboard";
import Profile from "../admin/pages/Profile";
import Products from "../admin/pages/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "admin",
    element: (
      <AuthUser>
        <Admin />
      </AuthUser>
    ),
    children: [
      {
        path: "dashboard", // Relative path
        element: <Dashboard />,
      },
      {
        path: "profile", // Relative path
        element: <Profile />,
      },
      {
        path: "products", // Relative path
        element: <Products />,
      },
    ],
  },
]);

export default router;
