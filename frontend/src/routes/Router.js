import React, { lazy } from "react";

const FullLayout = lazy(() => import("../layout/Layout"));

/* *** Landing page *** */
const Home = lazy(() => import("../views/Home"));

/* ****Routes***** */

const Router = () => [
  {
    path: "/",
    element: <FullLayout />,
    children: [{ path: "", element: <Home /> }],
  },
];

export default Router;
