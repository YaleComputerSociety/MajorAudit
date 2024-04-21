import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Courses from "./pages/Courses";
import Majors from "./pages/Majors";
import Graduation from "./pages/Graduation";
import FAQ from "./pages/OtherPages/FAQ/FAQ";
const router = createBrowserRouter([
  {
    path: "",
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
  {
    path: "/faq",
    element: <FAQ />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
