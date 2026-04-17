import {
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
  type Node,
} from "@xyflow/react";
import { useEffect } from "react";
import { useParams } from "react-router";
import useCreateEdge from "../hooks/edges/useCreateEdge";
import useUpdateGraphNode from "../hooks/nodes/useUpdateGraphNode";
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
  const [nodes, setNodes, onNodesChange] = useNodesState<QuestNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const createEdgeMutation = useCreateEdge();
  const updateNodeMutation = useUpdateGraphNode();

  const handleConnect = async (connection: Connection) => {
    const optimisticEdge = {
      id: crypto.randomUUID(),
      source: connection.source,
      target: connection.target,
    };

    setEdges((prev) => [...prev, optimisticEdge]);

    createEdgeMutation.mutate(
      {
        questId,
        nodeFromId: connection.source,
        nodeToId: connection.target,
      },
      {
        onError: () => {
          setEdges((prev) =>
            prev.filter((edge) => edge.id !== optimisticEdge.id),
          );
        },
      },
    );
  };

  const handleNodeDragStop = (_event: React.MouseEvent, node: QuestNode) => {
    updateNodeMutation.mutate({
      nodeId: node.id,
      positionX: node.position.x,
      positionY: node.position.y,
    });
  };

  // const handleDelete = (params: { nodes: QuestNode[]; edges: Edge[] }) => {

  // };

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
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={handleConnect}
          onNodeDragStop={handleNodeDragStop}
          onDelete={handleDelete}
          fitView
        />
      </div>
    </>
  );
};

export default Graph;
