import { useState } from "react";
import useLogout from "../../hooks/auth/useLogout";
import useMe from "../../hooks/auth/useMe";
import Button from "../ui/Button";
import LinkButton from "../ui/LinkButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: user } = useMe();
  const logoutMutation = useLogout();

  return (
    <>
      <nav className="hidden md:flex gap-6">
        {user ? null : (
          <LinkButton
            text="Регистрация"
            url="/auth/register"
            height="h-13"
            textSize="text-xl"
          />
        )}
        {user ? null : (
          <LinkButton
            text="Логин"
            url="/auth/login"
            height="h-13"
            textSize="text-xl"
          />
        )}
        {user ? (
          <LinkButton
            text="Профиль"
            url="/quests"
            height="h-13"
            textSize="text-xl"
          />
        ) : null}
        {user ? (
          <Button
            type="button"
            disabled={logoutMutation.isPending}
            onClick={() => logoutMutation.mutate(undefined)}
            text="Выйти"
          />
        ) : null}
      </nav>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col gap-1 border-none p-0"
      >
        <span className="w-6 h-0.5 bg-yellow-400"></span>
        <span className="w-6 h-0.5 bg-yellow-400"></span>
        <span className="w-6 h-0.5 bg-yellow-400"></span>
      </button>

      {isOpen && (
        <div className="md:hidden flex flex-col items-center fixed inset-0 z-20 pt-20 gap-5">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(!isOpen)}
          ></div>

          <div className="relative flex flex-col items-center gap-5 w-fit">
            <LinkButton
              text="Регистрация"
              url="/"
              height="h-13"
              textSize="text-xl"
            />
            <LinkButton text="Логин" url="/" height="h-13" textSize="text-xl" />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
