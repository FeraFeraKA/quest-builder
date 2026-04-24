import { Outlet, useLocation } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  const { pathname } = useLocation();

  const noPaddingRoutes = ["/graph"];
  const shouldRemovePadding = noPaddingRoutes.includes(pathname);

  return (
    <>
      <div
        className="inset-0 -z-50 h-full
        bg-[url(/images/bg.png)] bg-repeat bg-top [image-rendering:pixelated]"
      >
        <div className="flex min-h-screen flex-col">
          <Header />

          <main
            className={
              shouldRemovePadding
                ? "flex-1 py-10 px-3 sm:px-6 lg:px-10 xl:px-14"
                : "flex-1"
            }
          >
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
