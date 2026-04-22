import type { IQuest } from "../../types/quest.types";
import Quest from "../ui/QuestCard";

interface IQuestListProps {
  quests?: IQuest[];
}

const QuestList = ({ quests }: IQuestListProps) => {
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
          />
        ))}
      </div>
    </>
  );
};

export default QuestList;
