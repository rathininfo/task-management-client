import {
    createBrowserRouter,
  } from "react-router-dom";

import MainLayout from "../Layout/MainLayout";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement:<h1>This Is Error</h1>,
      children: [
        {
          path: "/",
          element: <h1>This is HOme</h1>,
        },
        {
          path: "/auth/register",
          element: <Register></Register>,
        },
        {
          path:"/auth/login",
          element:<Login></Login>
        }
      ],
    },
  ]);

  export default router;