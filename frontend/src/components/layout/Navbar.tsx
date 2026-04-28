import { useState } from "react";
import { useTranslation } from "react-i18next";
import useLogout from "../../hooks/auth/useLogout";
import useMe from "../../hooks/auth/useMe";
import NavbarActions from "../ui/NavbarActions";

const mobileMenuId = "mobile-navbar-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: user } = useMe();
  const logoutMutation = useLogout();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage;

  const handleChangeLanguage = (language: "ru" | "en") => {
    void i18n.changeLanguage(language);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="hidden lg:flex gap-6">
        <NavbarActions
          user={user}
          currentLanguage={currentLanguage}
          isLogoutPending={logoutMutation.isPending}
          onLogout={() => logoutMutation.mutate(undefined)}
          handleChangeLanguage={handleChangeLanguage}
          handleCloseModal={handleCloseModal}
        />
      </nav>

      <button
        type="button"
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={isOpen}
        aria-controls={mobileMenuId}
        onClick={() => setIsOpen((prev) => !prev)}
        className="lg:hidden flex flex-col gap-1 border-none mb-0.5"
      >
        <span className="w-6 h-0.5 bg-yellow-400"></span>
        <span className="w-6 h-0.5 bg-yellow-400"></span>
        <span className="w-6 h-0.5 bg-yellow-400"></span>
      </button>

      {isOpen && (
        <div
          id={mobileMenuId}
          className="lg:hidden flex flex-col items-center fixed inset-0 z-20 pt-20 gap-5"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleCloseModal}
          ></div>

          <div className="relative flex flex-col items-center gap-5 w-fit">
            <NavbarActions
              user={user}
              currentLanguage={currentLanguage}
              isLogoutPending={logoutMutation.isPending}
              onLogout={() => logoutMutation.mutate(undefined)}
              handleChangeLanguage={handleChangeLanguage}
              handleCloseModal={handleCloseModal}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
