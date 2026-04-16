import QuestList from "../components/layout/QuestList";
import Button from "../components/ui/Button";
import LinkButton from "../components/ui/LinkButton";
import useLogout from "../hooks/auth/useLogout";
import useQuests from "../hooks/quests/useQuests";

const Dashboard = () => {
  const { data: quests, isError, error } = useQuests();
  const logoutMutation = useLogout();

  return (
    <>
      <div className="flex flex-col items-center p-4 md:px-8 lg:px-12 gap-4 font-pixel text-yellow-300">
        <h1 className="text-3xl text-center">Это твоя страница с квестами</h1>
        <QuestList quests={quests} />
        <div className="flex flex-col md:flex-row items-center gap-4">
          <LinkButton
            text="На главную"
            url="/"
          />
          <Button
            text={logoutMutation.isPending ? "Выход..." : "Выйти"}
            onClick={() => logoutMutation.mutate(undefined)}
          />
          <LinkButton
            text="Создать квест"
            url="/quests/create"
          />
        </div>
        {isError && <p>{error.message}</p>}
      </div>
    </>
  );
};

export default Dashboard;

