import type { IQuest } from "../../types/quest.types";
import Quest from "../ui/Quest";

interface IQuestListProps {
  quests?: IQuest[];
}

const QuestList = ({ quests }: IQuestListProps) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4">
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
