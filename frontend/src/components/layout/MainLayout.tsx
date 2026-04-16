import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <div
        className="inset-0 -z-50 h-full
        bg-[url(/images/bg.png)] bg-repeat bg-top [image-rendering:pixelated]"
      >
        <div className="flex flex-col min-h-screen">
          <Header />

          <main className="flex-1">
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
