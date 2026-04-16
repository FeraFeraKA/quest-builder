import type { IQuest } from "../../types/quest.types";
import Quest from "../ui/QuestCard";

interface IQuestListProps {
  quests?: IQuest[];
}

const QuestList = ({ quests }: IQuestListProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center items-center gap-4">
        {quests?.map((quest) => (
          <Quest
            id={quest.id}
            title={quest.title}
            description={quest.description}
            createdAt={quest.createdAt}
            updatedAt={quest.updatedAt}
          />
        ))}
      </div>
    </>
  );
};

export default QuestList;
