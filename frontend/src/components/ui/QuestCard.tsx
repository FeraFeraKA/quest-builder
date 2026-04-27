import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useTranslation } from "react-i18next";
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

const Quest = ({
  id,
  title,
  description,
  createdAt,
  updatedAt,
  handleEditModal,
  handleSetQuestId,
}: IQuestProps) => {
  const { t, i18n } = useTranslation();
  const dayjsLocale = i18n.resolvedLanguage?.startsWith("ru") ? "ru" : "en";
  const createdAtTime = dayjs(createdAt)
    .locale(dayjsLocale)
    .format("D MMMM YYYY");
  const updatedAtTime = dayjs(updatedAt)
    .locale(dayjsLocale)
    .format("D MMMM YYYY");
  const navigate = useNavigate();
  const deleteQuestMutations = useDeleteQuest(id);

  const handleCardClick = () => {
    navigate(`/quests/${id}/graph`);
  };

  const handleCardKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate(`/quests/${id}/graph`);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteQuestMutations.mutate();
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
        className="cursor-pointer whitespace-normal wrap-break-word
         hover:brightness-110 hover:-translate-y-1 active:translate-y-0
         transition-all duration-200"
        onClick={handleCardClick}
        onKeyDown={(e) => handleCardKeyDown(e)}
        role="link"
        tabIndex={0}
      >
        <h1>{title}</h1>
        <h2>{description}</h2>
        <p>
          {t("quests:card.createdPrefix")} {createdAtTime}
        </p>
        <p>
          {t("quests:card.updatedPrefix")} {updatedAtTime}
        </p>
        <div className="flex flex-col items-start gap-2">
          <Button
            text={
              deleteQuestMutations.isPending
                ? t("quests:card.deleting")
                : t("quests:card.delete")
            }
            height="h-10"
            textSize="text-lg"
            className="mt-1"
            onClick={(e) => handleDeleteClick(e)}
            disabled={deleteQuestMutations.isPending}
          />
          <Button
            text={t("quests:card.play")}
            height="h-10"
            textSize="text-lg"
            onClick={(e) => handlePlayClick(e)}
          />
          <Button
            text={t("quests:card.edit")}
            height="h-10"
            textSize="text-lg"
            onClick={(e) => handleEditClick(e)}
          />
          {deleteQuestMutations.isError ? (
            <p>{deleteQuestMutations.error.message}</p>
          ) : null}
        </div>
      </Card>
    </>
  );
};

export default Quest;
