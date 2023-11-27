import { createBrowserRouter } from "react-router-dom";
import {
  Dashboard,
  Generator,
  Home,
  Signup,
  Accounts,
  Addresses,
  Contacts,
  Secrets,
  Files,
} from "@/pages";
import { Layout } from "./Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/accounts",
        element: <Accounts />,
      },
      {
        path: "/secrets",
        element: <Secrets />,
      },
      {
        path: "/files",
        element: <Files />,
      },
      {
        path: "/addresses",
        element: <Addresses />,
      },
      {
        path: "/contacts",
        element: <Contacts />,
      },
      {
        path: "/generator",
        element: <Generator />,
      },
    ],
  },
]);
