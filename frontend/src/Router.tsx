
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Courses from "./pages/Courses";
import Majors from "./pages/Majors";
import Graduation from "./pages/Graduation";

const router = createBrowserRouter([
  {
    path: "/graduation",
    element: <Graduation />,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/majors",
    element: <Majors />,
  },

]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
