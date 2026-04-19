import { useEffect, useState } from "react";
import type { TNodeId } from "../api/nodes";
import type { TQuestId } from "../api/quests";
import useGetQuest from "./quests/useGetQuest";

interface IStack {
  nodeFromId: TNodeId;
  nodeToId: TNodeId;
}

interface IQuestTraversalProps {
  questId: TQuestId;
}

const useQuestTraversal = ({ questId }: IQuestTraversalProps) => {
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

    const last = stack[stack.length - 1];
    if (!last) return;

    setCurrentNodeId(last.nodeFromId);
    setStack((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    if (!quest || !quest.startNodeId) return;

    setCurrentNodeId(quest.startNodeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quest?.startNodeId]);

  return {
    currentNode,
    currentNodeId,
    quest,
    furtherNodes,
    stack,
    handleNextClick,
    handleBackClick,
  };
};

export default useQuestTraversal;
