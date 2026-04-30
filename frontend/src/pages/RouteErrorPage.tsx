import { isRouteErrorResponse, useRouteError } from "react-router";
import LinkButton from "../components/ui/LinkButton";

const RouteErrorPage = () => {
  const error = useRouteError();

  let title = "Something went wrong";
  let message = "Unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;

    if (error.status === 404) {
      message = "Page not found.";
    } else if (error.status === 401) {
      message = "You are not authorized.";
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
      <LinkButton text="Back to main page" url="/" />
    </main>
  );
};

export default RouteErrorPage;
