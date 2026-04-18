import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, redirect } from "react-router";
import { RouterProvider } from "react-router/dom";
import { getMe } from "./api/auth";
import Layout from "./components/layout/MainLayout";
import "./index.css";
import CreateQuest from "./pages/CreateQuest";
import Dashboard from "./pages/Dashboard";
import EditorPage from "./pages/EditorPage";
import Graph from "./pages/Graph";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
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
        path: "/quests/create",
        loader: requireAuth,
        Component: CreateQuest,
      },
      {
        path: "/quests/:id",
        loader: requireAuth,
        Component: EditorPage,
      },
      {
        path: "/quests/:id/graph",
        loader: requireAuth,
        Component: Graph,
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
