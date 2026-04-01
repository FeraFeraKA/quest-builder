import { useState } from "react";
import { Link } from "react-router";
import LinkButton from "../ui/Button/LinkButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <nav className="hidden md:flex gap-6 mb-3">
        <LinkButton text={"Register"} url={"/"} />
        <LinkButton text={"Login"} url={"/"} />
        <LinkButton text={"Profile"} url={"/"} />
      </nav>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col gap-1 border-none p-0 mt-5 mb-8"
      >
        <span className="w-6 h-0.5 bg-black"></span>
        <span className="w-6 h-0.5 bg-black"></span>
        <span className="w-6 h-0.5 bg-black"></span>
      </button>

      {isOpen && (
        <div className="md:hidden flex">
          <Link to="/auth/register" className="link mt-0">
            Register
          </Link>
          <Link to="/auth/login" className="link mt-0">
            Login
          </Link>
          <Link to="/quests" className="link mt-0">
            Profile
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
