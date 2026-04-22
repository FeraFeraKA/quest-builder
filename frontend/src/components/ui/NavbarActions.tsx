import { useTranslation } from "react-i18next";
import Button from "./Button";
import LinkButton from "./LinkButton";

interface NavbarActionsProps {
  user: unknown;
  currentLanguage: string | undefined;
  isLogoutPending: boolean;
  onLogout: () => void;
  handleChangeLanguage: (language: "ru" | "en") => void;
  handleCloseModal: () => void;
}

const NavbarActions = ({
  user,
  currentLanguage,
  isLogoutPending,
  onLogout,
  handleChangeLanguage,
  handleCloseModal,
}: NavbarActionsProps) => {
  const { t } = useTranslation("layout");

  return (
    <>
      <Button
        text="RU"
        onClick={() => handleChangeLanguage("ru")}
        hidden={currentLanguage === "ru"}
      />
      <Button
        text="EN"
        onClick={() => handleChangeLanguage("en")}
        hidden={currentLanguage === "en"}
        className="lg:mr-6"
      />
      {user ? null : (
        <LinkButton
          text={t("navbar.register")}
          url="/auth/register"
          onClick={handleCloseModal}
        />
      )}
      {user ? null : (
        <LinkButton
          text={t("navbar.login")}
          url="/auth/login"
          onClick={handleCloseModal}
        />
      )}
      {user ? (
        <LinkButton
          text={t("navbar.profile")}
          url="/quests"
          onClick={handleCloseModal}
        />
      ) : null}
      {user ? (
        <Button
          type="button"
          disabled={isLogoutPending}
          onClick={() => {
            onLogout();
            handleCloseModal();
          }}
          text={t("navbar.logout")}
        />
      ) : null}
    </>
  );
};

export default NavbarActions;
