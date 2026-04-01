import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from "./components/layout/MainLayout";
import "./index.css";
import MainPage from "./pages/MainPage";

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [{ path: "/", Component: MainPage }],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
