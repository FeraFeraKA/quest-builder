import {
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Edge,
  type Node,
} from "@xyflow/react";
import { useEffect } from "react";
import { useParams } from "react-router";
import useGetQuest from "../hooks/quests/useGetQuest";

type IData = {
  label: string;
  description: string;
};

type QuestNode = Node<IData>;

const Graph = () => {
  const params = useParams();
  const questId = params.id!;
  const { data: quest } = useGetQuest(questId);
  const [nodes, setNodes] = useNodesState<QuestNode>([]);
  const [edges, setEdges] = useEdgesState<Edge>([]);

  useEffect(() => {
    if (!quest) return;

    setNodes(
      (quest.nodes ?? []).map((node) => ({
        id: node.id,
        position: {
          x: node.positionX,
          y: node.positionY,
        },
        data: {
          label: node.title,
          description: node.description,
        },
      })),
    );

    setEdges(
      (quest.edges ?? []).map((edge) => ({
        id: edge.id,
        source: edge.nodeFromId,
        target: edge.nodeToId,
      })),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quest?.id]);

  return (
    <>
      <div className="h-[calc(100dvh-20rem)] w-full text-yellow-300 font-pixel">
        <ReactFlow nodes={nodes} edges={edges} fitView />
      </div>
    </>
  );
};

export default Graph;
