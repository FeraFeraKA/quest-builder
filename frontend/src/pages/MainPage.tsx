import { useTranslation } from "react-i18next";
import Button from "../components/ui/Button";
import LinkButton from "../components/ui/LinkButton";
import useMe from "../hooks/auth/useMe";

const MainPage = () => {
  const { t } = useTranslation();
  const { data: user, isPending } = useMe();

  return (
    <>
      <div className="mx-auto my-10 max-w-300 text-center">
        <h1 className="mx-auto font-pixel text-yellow-300 max-w-240">
          {t("quests:mainPage.heroTitle")}
        </h1>
        <p className="md:text-2xl text-lg mt-4">
          {t("quests:mainPage.description")}
        </p>
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-10">
          {isPending ? (
            <Button
              text={t("common:actions.loading")}
              height="h-13 md:h-16"
              textSize="text-lg md:text-2xl"
              disabled
            />
          ) : (
            <LinkButton
              text={t(
                user
                  ? "quests:mainPage.continueQuest"
                  : "quests:mainPage.startQuest",
              )}
              url={user ? "/quests" : "/auth/register"}
              height="h-13 md:h-16"
              textSize="text-lg md:text-2xl"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MainPage;
