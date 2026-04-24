import { useTranslation } from "react-i18next";

const Guide = () => {
  const { t } = useTranslation("quests");

  return (
    <div className="text-center max-w-4xl mx-auto">
      <h1>{t("guide.title")}</h1>

      <div className="mt-4 space-y-4 text-left">
        <p>{t("guide.p1")}</p>

        <p>{t("guide.p2")}</p>

        <p>{t("guide.p3")}</p>

        <p>{t("guide.p4")}</p>

        <p>{t("guide.p5")}</p>

        <p>{t("guide.p6")}</p>

        <p>{t("guide.p7")}</p>

        <p>{t("guide.p8")}</p>

        <p>{t("guide.p9")}</p>
      </div>
    </div>
  );
};

export default Guide;
