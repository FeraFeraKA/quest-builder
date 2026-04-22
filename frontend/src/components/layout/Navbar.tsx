import { useState } from "react";
import { useTranslation } from "react-i18next";
import useLogout from "../../hooks/auth/useLogout";
import useMe from "../../hooks/auth/useMe";
import Button from "../ui/Button";
import LinkButton from "../ui/LinkButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: user } = useMe();
  const logoutMutation = useLogout();
  const { t } = useTranslation("layout");
  const { i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage;

  const handleChangeLanguage = (language: "ru" | "en") => {
    void i18n.changeLanguage(language);
  };

  return (
    <>
      <nav className="hidden md:flex gap-6">
        <Button
          text="RU"
          onClick={() => handleChangeLanguage("ru")}
          disabled={currentLanguage === "ru"}
        />
        <Button
          text="EN"
          onClick={() => handleChangeLanguage("en")}
          disabled={currentLanguage === "en"}
          className="mr-12"
        />
        {user ? null : (
          <LinkButton text={t("navbar.mobileRegister")} url="/auth/register" />
        )}
        {user ? null : (
          <LinkButton text={t("navbar.mobileLogin")} url="/auth/login" />
        )}
        {user ? <LinkButton text={t("navbar.profile")} url="/quests" /> : null}
        {user ? (
          <Button
            type="button"
            disabled={logoutMutation.isPending}
            onClick={() => logoutMutation.mutate(undefined)}
            text={t("navbar.logout")}
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
            <LinkButton text={t("navbar.mobileRegister")} url="/auth/register" />
            <LinkButton text={t("navbar.mobileLogin")} url="/auth/login" />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
