import { useTranslation } from "react-i18next";
import LinkButton from "../components/ui/LinkButton";

const Guide = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center max-w-4xl mx-auto">
      <h1>{t("quests:guide.title")}</h1>

      <div className="flex flex-col items-center mt-4 gap-y-4 text-left">
        <p>{t("quests:guide.p1")}</p>

        <p>{t("quests:guide.p2")}</p>

        <p>{t("quests:guide.p3")}</p>

        <p>{t("quests:guide.p4")}</p>

        <p>{t("quests:guide.p5")}</p>

        <p>{t("quests:guide.p6")}</p>

        <p>{t("quests:guide.p7")}</p>

        <p>{t("quests:guide.p8")}</p>

        <p>{t("quests:guide.p9")}</p>

        <LinkButton text={t("common:actions.back")} url="/quests" />
      </div>
    </div>
  );
};

export default Guide;
