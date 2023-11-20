import { createBrowserRouter } from "react-router-dom";
import { Landing, Signup } from "@/pages";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/signup",
      element: <Signup />
    }
  ]);