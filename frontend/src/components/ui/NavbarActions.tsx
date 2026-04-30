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
  const { t } = useTranslation();

  return (
    <>
      <Button
        text={t("layout:navbar.languageRu")}
        onClick={() => handleChangeLanguage("ru")}
        hidden={currentLanguage === "ru"}
        className="lg:mr-6"
        aria-label={t("layout:navbar.switchToRussian")}
      />
      <Button
        text={t("layout:navbar.languageEn")}
        onClick={() => handleChangeLanguage("en")}
        hidden={currentLanguage === "en"}
        className="lg:mr-6"
        aria-label={t("layout:navbar.switchToEnglish")}
      />
      {user ? null : (
        <LinkButton
          text={t("layout:navbar.register")}
          url="/auth/register"
          onClick={handleCloseModal}
        />
      )}
      {user ? null : (
        <LinkButton
          text={t("layout:navbar.login")}
          url="/auth/login"
          onClick={handleCloseModal}
        />
      )}
      {user ? (
        <LinkButton
          text={t("layout:navbar.profile")}
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
          text={t("layout:navbar.logout")}
        />
      ) : null}
    </>
  );
};

export default NavbarActions;
