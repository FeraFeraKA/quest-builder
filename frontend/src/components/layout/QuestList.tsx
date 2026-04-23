import type { TQuestId } from "../../api/quests";
import type { IQuest } from "../../types/quest.types";
import Quest from "../ui/QuestCard";

interface IQuestListProps {
  quests?: IQuest[];
  handleEditModal: (flag: boolean) => void;
  handleSetQuestId: (questId: TQuestId) => void;
}

const QuestList = ({
  quests,
  handleEditModal,
  handleSetQuestId,
}: IQuestListProps) => {
  return (
    <>
      <div className="grid justify-center gap-4 grid-cols-[repeat(auto-fit,minmax(310px,360px))]">
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
          />
        ))}
      </div>
    </>
  );
};

export default QuestList;
