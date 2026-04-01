import Logo from "../ui/Logo";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <>
      <header className="flex justify-between mb-3">
        <Logo />
        <Navbar />
      </header>
      <span className="block h-0.5 bg-gray-200"></span>
    </>
  );
};

export default Header;
