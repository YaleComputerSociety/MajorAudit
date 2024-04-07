
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Courses from "./pages/Courses";
import Majors from "./pages/Majors";
import Graduation from "./pages/Graduation";

const router = createBrowserRouter([
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/majors",
    element: <Majors />,
  },
  {
    path: "",
    element: <Graduation />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
