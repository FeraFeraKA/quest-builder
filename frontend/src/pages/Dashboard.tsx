import { useState } from "react";
import type { TQuestId } from "../api/quests";
import QuestList from "../components/layout/QuestList";
import Button from "../components/ui/Button";
import LinkButton from "../components/ui/LinkButton";
import useLogout from "../hooks/auth/useLogout";
import useGetQuests from "../hooks/quests/useGetQuests";
import CreateQuest from "./CreateQuest";
import EditQuest from "./EditQuest";

const Dashboard = () => {
  const { data: quests, isError, error } = useGetQuests();
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [questId, setQuestId] = useState("");
  const logoutMutation = useLogout();

  const handleCloseCreateModal = () => {
    setCreateIsOpen(false);
  };

  const handleEditModal = (flag: boolean) => {
    setEditIsOpen(flag);
  };

  const handleSetQuestId = (questId: TQuestId) => {
    setQuestId(questId);
  };

  return (
    <>
      <div className="flex flex-col gap-4 font-pixel text-yellow-300">
        <h1 className="text-center">Это твоя страница с квестами</h1>
        <QuestList
          quests={quests}
          handleEditModal={handleEditModal}
          handleSetQuestId={handleSetQuestId}
        />
        <div className="flex flex-col md:flex-row items-center self-center gap-4">
          <LinkButton text="На главную" url="/" />
          <Button
            text={logoutMutation.isPending ? "Выход..." : "Выйти"}
            onClick={() => logoutMutation.mutate(undefined)}
          />
          <Button
            text="Создать квест"
            onClick={() => setCreateIsOpen((prev) => !prev)}
          />
        </div>
        {isError && <p>{error.message}</p>}
      </div>

      {createIsOpen && (
        <CreateQuest handleCloseModal={handleCloseCreateModal} />
      )}
      {editIsOpen && (
        <EditQuest questId={questId} handleEditModal={handleEditModal} />
      )}
    </>
  );
};

export default Dashboard;
