import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main>
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
