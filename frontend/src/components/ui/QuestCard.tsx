import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useNavigate } from "react-router";
import type { TQuestId } from "../../api/quests";
import useDeleteQuest from "../../hooks/quests/useDeleteQuest";
import Button from "./Button";
import Card from "./Card";

interface IQuestProps {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  handleEditModal: (flag: boolean) => void;
  handleSetQuestId: (questId: TQuestId) => void;
}

dayjs.locale("ru");

const Quest = ({
  id,
  title,
  description,
  createdAt,
  updatedAt,
  handleEditModal,
  handleSetQuestId,
}: IQuestProps) => {
  const createdAtTime = dayjs(createdAt).format("D MMMM YYYY");
  const updatedAtTime = dayjs(updatedAt).format("D MMMM YYYY");
  const navigate = useNavigate();
  const deleteMutations = useDeleteQuest(id);

  const handleCardClick = () => {
    navigate(`/quests/${id}/graph`);
  };

  const handleCardKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate(`/quests/${id}`);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteMutations.mutate();
  };

  const handlePlayClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(`/quests/${id}/play`);
  };

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleSetQuestId(id);
    handleEditModal(true);
  };

  return (
    <>
      <Card
        className="cursor-pointer whitespace-normal wrap-break-word hover:brightness-110 hover:-translate-y-1 active:translate-y-0 transition-all duration-200"
        onClick={handleCardClick}
        onKeyDown={(e) => handleCardKeyDown(e)}
        role="link"
        tabIndex={0}
      >
        <h1>{title}</h1>
        <h2>{description}</h2>
        <p>Создан: {createdAtTime}</p>
        <p>Обновлён: {updatedAtTime}</p>
        <div className="flex flex-col items-start gap-2">
          <Button
            text="Удалить"
            height="h-10"
            textSize="text-lg"
            className="mt-1"
            onClick={(e) => handleDeleteClick(e)}
          />
          <Button
            text="Играть"
            height="h-10"
            textSize="text-lg"
            onClick={(e) => handlePlayClick(e)}
          />
          <Button
            text="Редактировать"
            height="h-10"
            textSize="text-lg"
            onClick={(e) => handleEditClick(e)}
          />
        </div>
      </Card>
    </>
  );
};

export default Quest;
