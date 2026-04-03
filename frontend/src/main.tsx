import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from "./components/layout/MainLayout";
import "./index.css";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { path: "/", Component: MainPage },
      {
        path: "/auth/register",
        Component: Register,
      },
      {
        path: "/auth/login",
        Component: Login,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
