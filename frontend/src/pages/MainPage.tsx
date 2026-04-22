import { useTranslation } from "react-i18next";
import LinkButton from "../components/ui/LinkButton";

const MainPage = () => {
  const { t } = useTranslation("quests");

  return (
    <>
      <div className="mx-auto my-20 max-w-200">
        <h1 className="font-pixel text-4xl md:text-6xl text-center text-yellow-300 ">
          {t("mainPage.heroTitle")}
        </h1>
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-10">
          <LinkButton
            text={t("mainPage.startCta")}
            url="/auth/register"
            height="h-[clamp(41px,16vw-10px,88px)]"
            textSize="text-[clamp(16px,2vw+10px,30px)]"
          />
        </div>
      </div>
    </>
  );
};

export default MainPage;
