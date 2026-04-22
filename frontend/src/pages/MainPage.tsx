import { useTranslation } from "react-i18next";
import LinkButton from "../components/ui/LinkButton";
import useMe from "../hooks/auth/useMe";

const MainPage = () => {
  const { t } = useTranslation("quests");
  const { data: user } = useMe();

  return (
    <>
      <div className="mx-auto my-20 max-w-300 text-center">
        <h1 className="mx-auto font-pixel text-4xl md:text-6xl text-yellow-300 max-w-200">
          {t("mainPage.heroTitle")}
        </h1>
        <p className="md:text-2xl text-lg mt-4">{t("mainPage.description")}</p>
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-10">
          <LinkButton
            text={t(user ? "mainPage.continueQuest" : "mainPage.startQuest")}
            url={user ? "/quests" : "/auth/register"}
            height="h-13 md:h-16"
            textSize="text-lg md:text-2xl"
          />
        </div>
      </div>
    </>
  );
};

export default MainPage;
