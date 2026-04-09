import { useNavigate } from "react-router";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import LinkButton from "../components/ui/LinkButton";
import useQuests from "../hooks/auth/useQuests";

const Dashboard = () => {
  const { data: quests, isPending, isError, error } = useQuests();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Login failed");

    navigate("/");
  };

  return (
    <>
      <div
        className="absolute inset-0 -z-50 h-screen
        bg-[url(/images/bg.png)] bg-repeat bg-top [image-rendering:pixelated]"
      ></div>
      <div className="flex flex-col items-center my-4 gap-4 font-pixel text-yellow-300">
        <h1 className="text-3xl">Это твоя страница с квестами</h1>
        <Card>
          <h2 className="font-pixel text-2xl text-yellow-300 my-4">
            Quest Card
          </h2>

          <p className="font-jetbrains text-white">
            Здесь лежит текст карточки. Центр повторяется, края не ломаются.
          </p>
        </Card>
        <form
          className="flex items-center gap-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <LinkButton
            text="Назад на главную страницу"
            url="/"
            height="h-13"
            textSize="text-xl"
          />
          <Button text="Выйти" />
        </form>
        {isError && <p>{error.message}</p>}
      </div>
    </>
  );
};

export default Dashboard;
