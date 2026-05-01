import { useTranslation } from "react-i18next";
import { isRouteErrorResponse, useRouteError } from "react-router";
import LinkButton from "../components/ui/LinkButton";

const RouteErrorPage = () => {
  const { t } = useTranslation();
  const error = useRouteError();

  let title = t("common:errorPage.genericTitle");
  let message = t("common:errorPage.unexpected");

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText || ""}`.trim();

    if (error.status === 404) {
      message = t("common:errorPage.notFound");
    } else if (error.status === 401) {
      message = t("common:errorPage.unauthorized");
    } else {
      message = error.data?.message || message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center
      gap-2 text-center bg-size-[400px_400px] bg-[url(/images/bg.png)]
      bg-repeat bg-top [image-rendering:pixelated]"
    >
      <h1 className="text-4xl">{title}</h1>
      <p className="text-xl">{message}</p>
      <LinkButton text={t("common:errorPage.backToMain")} url="/" />
    </main>
  );
};

export default RouteErrorPage;
