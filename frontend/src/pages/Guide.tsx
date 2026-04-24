import { useTranslation } from "react-i18next";
import LinkButton from "../components/ui/LinkButton";

const Guide = () => {
  const { t } = useTranslation(["quests", "common"]);

  return (
    <div className="text-center max-w-4xl mx-auto">
      <h1>{t("guide.title")}</h1>

      <div className="flex items-center mt-4 gap-y-4 text-left">
        <p>{t("guide.p1")}</p>

        <p>{t("guide.p2")}</p>

        <p>{t("guide.p3")}</p>

        <p>{t("guide.p4")}</p>

        <p>{t("guide.p5")}</p>

        <p>{t("guide.p6")}</p>

        <p>{t("guide.p7")}</p>

        <p>{t("guide.p8")}</p>

        <p>{t("guide.p9")}</p>

        <LinkButton text={t("actions.back", { ns: "common" })} url="/quests" />
      </div>
    </div>
  );
};

export default Guide;
