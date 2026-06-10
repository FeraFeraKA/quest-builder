import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, redirect } from "react-router";
import { RouterProvider } from "react-router/dom";
import { getMe } from "./api/auth";
import { setAuthExpiredHandler } from "./api/fetcher";
import Layout from "./components/layout/MainLayout";
import { Dashboard, Graph, Play, Playtest } from "./helpers/lazyPages";
import { ApiError } from "./helpers/apiError";
import "./i18n";
import "./index.css";
import Guide from "./pages/Guide";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";
import Register from "./pages/Register";
import RouteErrorPage from "./pages/RouteErrorPage";

const requireAuth = async () => {
  try {
    const user = await getMe();
    return user;
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      throw redirect("/auth/login");
    }

    throw error;
  }
};

const router = createBrowserRouter([
  {
    Component: Layout,
    errorElement: <RouteErrorPage />,
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
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
]);

const queryClient = new QueryClient();

setAuthExpiredHandler(() => {
  queryClient.clear();

  if (
    typeof window !== "undefined" &&
    window.location.pathname !== "/auth/login"
  ) {
    window.location.assign("/auth/login");
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Suspense>
  </StrictMode>,
);
