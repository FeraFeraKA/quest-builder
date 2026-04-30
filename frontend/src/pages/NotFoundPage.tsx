import LinkButton from "../components/ui/LinkButton";

const NotFoundPage = () => {
  return (
    <main className="flex flex-col items-center justify-center gap-2 text-center">
      <h1>404</h1>
      <p>Page not found.</p>
      <LinkButton text="Back to main page" url="/" />
    </main>
  );
};

export default NotFoundPage;
