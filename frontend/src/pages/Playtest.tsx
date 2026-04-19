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
    <div className="flex flex-col items-center justify-center text-center mt-4 gap-4">
      <h1>Тестирование истории</h1>
      {currentNode ? <h1>{currentNode.description}</h1> : null}
      {!currentNodeId || !quest ? (
        <h1>У тебя не выбран стартовый узел</h1>
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center mt-2">
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
        </div>
      )}
      <LinkButton text="Выйти" url={`/quests/${questId}/graph`} />
    </div>
  );
};

export default Playtest;
