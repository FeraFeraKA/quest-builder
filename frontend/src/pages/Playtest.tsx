import { useParams } from "react-router";
import Button from "../components/ui/Button";
import LinkButton from "../components/ui/LinkButton";
import useQuestTraversal from "../hooks/useQuestTraversal";

const Playtest = () => {
  const params = useParams();
  const questId = params.id!;
  const {
    currentNode,
    currentNodeId,
    quest,
    furtherNodes,
    stack,
    handleNextClick,
    handleBackClick,
  } = useQuestTraversal({ questId });

  return (
    <div className="flex flex-col items-center justify-center my-4">
      <h1>Тестирование истории</h1>
      <h1 className="mt-4">{currentNode?.description}</h1>
      {!currentNodeId || !quest ? (
        <p>У тебя не выбран стартовый узел</p>
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center mt-6">
          {furtherNodes.map((node) => (
            <Button
              text={node.title}
              key={node.id}
              onClick={(e) => handleNextClick(e, node.id)}
            />
          ))}
          <Button
            text="Вернуться назад"
            onClick={(e) => handleBackClick(e)}
            disabled={stack.length === 0}
          />
          <LinkButton text="Выйти" url={`/quests/${questId}/graph`} />
        </div>
      )}
    </div>
  );
};

export default Playtest;
