import {
    createBrowserRouter,
  } from "react-router-dom";

import MainLayout from "../Layout/MainLayout";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import PrivateRoute from "./PrivateRoute";
import Home from "../Pages/Home/Home";
import CreateTaskForm from "../Component/CreateTaskForm";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement:<h1>This Is Error</h1>,
      children: [
        {
          path: "/",
          element: <PrivateRoute><Home></Home></PrivateRoute>,
        },
        {
          path: "/auth/register",
          element: <Register></Register>,
        },
        {
          path:"/auth/login",
          element:<Login></Login>
        },
        {
          path:"/task",
          element: <div className="mt-5"><CreateTaskForm></CreateTaskForm></div>
        }
      ],
    },
  ]);

  export default router;