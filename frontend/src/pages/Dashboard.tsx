import QuestList from "../components/layout/QuestList";
import Button from "../components/ui/Button";
import LinkButton from "../components/ui/LinkButton";
import useLogout from "../hooks/auth/useLogout";
import useQuests from "../hooks/quests/useQuests";

const Dashboard = () => {
  const { data: quests, isError, error } = useQuests();
  const logoutMutation = useLogout();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    logoutMutation.mutate(undefined);
  };

  return (
    <>
      <div
        className="absolute inset-0 -z-50 h-screen
        bg-[url(/images/bg.png)] bg-repeat bg-top [image-rendering:pixelated]"
      ></div>
      <div className="flex flex-col items-center my-4 gap-4 font-pixel text-yellow-300">
        <h1 className="text-3xl text-center">Это твоя страница с квестами</h1>
        <QuestList quests={quests} />
        <form
          className="flex flex-col md:flex-row items-center gap-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <LinkButton
            text="На главную"
            url="/"
            height="h-13"
            textSize="text-xl"
          />
          <Button text={logoutMutation.isPending ? "Выход..." : "Выйти"} />
        </form>
        {isError && <p>{error.message}</p>}
      </div>
    </>
  );
};

export default Dashboard;
