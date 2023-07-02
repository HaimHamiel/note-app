import React from "react";
import { useRoutes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { Home, Login, Register, Dashboard, PrivateRoute } from "./elements";
import { appPaths } from "./paths";

export default function Router() {
  const routes = [
    {
      path: appPaths.home,
      element: <Layout />,
      children: [
        {
          path: appPaths.home,
          element: <Home />,
        },
        {
          path: appPaths.login,
          element: <Login />,
        },
        {
          path: appPaths.register,
          element: <Register />,
        },
        {
         element: <PrivateRoute />,
         children: [
            {
                path: appPaths.dashboard,
                element: <Dashboard />,
            }
         ]
        },
        
      ],
    },
  ];
  return useRoutes(routes);
}