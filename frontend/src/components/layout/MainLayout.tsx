import { Outlet, useLocation } from "react-router";
import usePreloadCriticalImages from "../../hooks/usePreloadCriticalImages";
import usePreloadSecondaryAssets from "../../hooks/usePreloadSecondaryImages";
import Footer from "./Footer";
import GlobalLoadingBar from "./GlobalLoadingBar";
import Header from "./Header";

const Layout = () => {
  const { pathname } = useLocation();

  const shouldRemovePadding = pathname.endsWith("/graph");

  const areCriticalAssetsLoaded = usePreloadCriticalImages();

  usePreloadSecondaryAssets();

  if (!areCriticalAssetsLoaded) {
    return <div className="min-h-screen bg-white" />;
  }

  if (areCriticalAssetsLoaded) {
    return (
      <>
        <div
          className="inset-0 -z-50 h-full bg-size-[400px_400px]
        bg-[url(/images/bg.png)] bg-repeat bg-top [image-rendering:pixelated]"
        >
          <div className="flex min-h-screen flex-col">
            <GlobalLoadingBar />

            <Header />

            <main
              className={
                shouldRemovePadding
                  ? "flex-1"
                  : "flex-1 py-10 px-3 sm:px-6 lg:px-10 xl:px-14"
              }
            >
              <Outlet />
            </main>

            <Footer />
          </div>
        </div>
      </>
    );
  }
};

export default Layout;
