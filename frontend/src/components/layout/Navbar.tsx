import { useState } from "react";
import LinkButton from "../ui/Button/LinkButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <nav className="hidden md:flex gap-6">
        <LinkButton text={"Регистрация"} url={"/"} />
        <LinkButton text={"Логин"} url={"/"} />
        {/* <LinkButton text={"Профиль"} url={"/"} /> */}
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
          <LinkButton text={"Регистрация"} url={"/"} />
          <LinkButton text={"Логин"} url={"/"} />
        </div>
      )}
    </>
  );
};

export default Navbar;
