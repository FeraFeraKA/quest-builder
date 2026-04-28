import Logo from "../ui/Logo";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <>
      <header
        className="
          h-40 flex items-center justify-between
          bg-[url(/images/navbar.png)] bg-repeat-x bg-top [image-rendering:pixelated]"
      >
        <div
          className="
            flex items-center justify-between w-full pt-2
            px-3 sm:px-6 lg:px-10 xl:px-14
          "
        >
          <Logo />
          <Navbar />
        </div>
      </header>
    </>
  );
};

export default Header;
