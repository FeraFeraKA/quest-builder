import Quest from "./Quest";

export const QuestList = ({ quests, loadQuests }) => {
  return (
    <>
      <div className="flex items-center gap-4">
        {quests.map((quest) => (
          <Quest
            key={quest.id}
            title={quest.title}
            description={quest.description}
            questId={quest.id}
            loadQuests={loadQuests}
          />
        ))}
      </div>
    </>
  );
};
