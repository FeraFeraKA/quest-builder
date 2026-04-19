import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { TNodeId } from "../api/nodes";
import Button from "../components/ui/Button";
import LinkButton from "../components/ui/LinkButton";
import useGetQuest from "../hooks/quests/useGetQuest";

interface IStack {
  nodeFromId: TNodeId;
  nodeToId: TNodeId;
}

const Playtest = () => {
  const params = useParams();
  const questId = params.id!;
  const { data: quest } = useGetQuest(questId);
  const [currentNodeId, setCurrentNodeId] = useState("");
  const [stack, setStack] = useState<IStack[]>([]);

  const nextIds =
    !quest || !currentNodeId
      ? []
      : quest.edges
          .filter((edge) => edge.nodeFromId === currentNodeId)
          .map((edge) => edge.nodeToId);

  const furtherNodes = !quest
    ? []
    : quest.nodes.filter((node) => nextIds.includes(node.id));

  const currentNode =
    !quest || !currentNodeId
      ? null
      : quest.nodes.find((node) => node.id === currentNodeId);

  const handleNextClick = (e: React.MouseEvent, nodeId: TNodeId) => {
    e.preventDefault();

    setStack((prev) => [
      ...prev,
      {
        nodeFromId: currentNodeId,
        nodeToId: nodeId,
      },
    ]);

    setCurrentNodeId(nodeId);
  };

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();

    setStack((prev) => {
      const last = prev[prev.length - 1];
      if (!last) return prev;

      setCurrentNodeId(last.nodeFromId);
      return prev.slice(0, -1);
    });
  };

  useEffect(() => {
    if (!quest || !quest.startNodeId) return;

    setCurrentNodeId(quest.startNodeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quest?.id]);

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
