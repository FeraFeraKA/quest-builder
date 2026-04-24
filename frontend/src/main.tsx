import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, redirect } from "react-router";
import { RouterProvider } from "react-router/dom";
import { getMe } from "./api/auth";
import Layout from "./components/layout/MainLayout";
import "./i18n";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import Graph from "./pages/Graph";
import Guide from "./pages/Guide";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Play from "./pages/Play";
import Playtest from "./pages/Playtest";
import Register from "./pages/Register";

const requireAuth = async () => {
  try {
    const user = await getMe();
    return user;
  } catch {
    throw redirect("/auth/login");
  }
};

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
      {
        path: "/quests",
        loader: requireAuth,
        Component: Dashboard,
      },
      {
        path: "/guide",
        loader: requireAuth,
        Component: Guide,
      },
      {
        path: "/quests/:id/graph",
        loader: requireAuth,
        Component: Graph,
      },
      {
        path: "/quests/:id/playtest",
        loader: requireAuth,
        Component: Playtest,
      },
      {
        path: "/quests/:id/play",
        loader: requireAuth,
        Component: Play,
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
