import type { TQuestId } from "../../api/quests";
import type { IQuest } from "../../types/quest.types";
import Quest from "../ui/QuestCard";

interface IQuestListProps {
  quests?: IQuest[];
  label: string;
  emptyMessage: string;
  handleEditModal: (flag: boolean) => void;
  handleSetQuestId: (questId: TQuestId) => void;
  handleDeleteQuest: (quest: { id: TQuestId; title: string }) => void;
}

const QuestList = ({
  quests,
  label,
  emptyMessage,
  handleEditModal,
  handleSetQuestId,
  handleDeleteQuest,
}: IQuestListProps) => {
  if (quests && quests.length === 0) {
    return (
      <div className="min-h-91.5 flex items-center justify-center text-center">
        <p role="status">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      <div
        role="list"
        aria-label={label}
        className="min-h-91.5 grid justify-center gap-4 grid-cols-[repeat(auto-fit,minmax(310px,360px))]"
      >
        {quests?.map((quest) => (
          <Quest
            key={quest.id}
            id={quest.id}
            title={quest.title}
            description={quest.description}
            createdAt={quest.createdAt}
            updatedAt={quest.updatedAt}
            handleEditModal={handleEditModal}
            handleSetQuestId={handleSetQuestId}
            handleDeleteQuest={handleDeleteQuest}
          />
        ))}
      </div>
    </>
  );
};

export default QuestList;
