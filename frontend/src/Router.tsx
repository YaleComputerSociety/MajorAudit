import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Courses from "./pages/Courses";
import Majors from "./pages/Majors";
import Graduation from "./pages/Graduation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>MajorAudit</div>,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/majors",
    element: <Majors />,
  },
  {
    path: "/graduation",
    element: <Graduation />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
