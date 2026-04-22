import { useParams } from "react-router";
import Button from "../components/ui/Button";
import LinkButton from "../components/ui/LinkButton";
import useQuestTraversal from "../hooks/useQuestTraversal";

const Play = () => {
  const params = useParams();
  const questId = params.id!;
  const { currentNode, currentNodeId, quest, furtherNodes, handleNextClick } =
    useQuestTraversal({ questId });

  return (
    <div className="flex flex-col items-center justify-center text-center gap-4">
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
        </div>
      )}
      <LinkButton text="Выйти" url={`/quests`} />
    </div>
  );
};

export default Play;
