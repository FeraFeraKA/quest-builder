import { useTranslation } from "react-i18next";
import LinkButton from "../components/ui/LinkButton";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <main className="flex flex-col items-center justify-center gap-2 text-center">
      <h1>404</h1>
      <p>{t("common:errorPage.notFound")}</p>
      <LinkButton text={t("common:errorPage.backToMain")} url="/" />
    </main>
  );
};

export default NotFoundPage;
