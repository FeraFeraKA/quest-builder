import {
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
} from "@xyflow/react";
import { useEffect } from "react";
import { useParams } from "react-router";
import CustomNode, { type QuestNode } from "../components/ui/CustomNode";
import LinkButton from "../components/ui/LinkButton";
import useCreateEdge from "../hooks/edges/useCreateEdge";
import useDeleteEdge from "../hooks/edges/useDeleteEdge";
import useDeleteNode from "../hooks/nodes/useDeleteNode";
import useUpdateGraphNode from "../hooks/nodes/useUpdateGraphNode";
import useGetQuest from "../hooks/quests/useGetQuest";

const nodeTypes = {
  customNode: CustomNode,
};

const Graph = () => {
  const params = useParams();
  const questId = params.id!;
  const { data: quest } = useGetQuest(questId);
  const [nodes, setNodes, onNodesChange] = useNodesState<QuestNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const updateNodeMutation = useUpdateGraphNode();
  const deleteNodeMutation = useDeleteNode();
  const createEdgeMutation = useCreateEdge();
  const deleteEdgeMutation = useDeleteEdge();

  const handleConnect = async (connection: Connection) => {
    const tempId = `temp-${crypto.randomUUID()}`;

    const tempEdge: Edge = {
      id: tempId,
      source: connection.source,
      target: connection.target,
    };

    setEdges((prev) => [...prev, tempEdge]);

    try {
      const createdEdge = await createEdgeMutation.mutateAsync({
        questId,
        nodeFromId: connection.source,
        nodeToId: connection.target,
      });

      setEdges((prev) =>
        prev.map((edge) =>
          edge.id === tempId
            ? {
                id: createdEdge.id,
                source: createdEdge.nodeFromId,
                target: createdEdge.nodeToId,
              }
            : edge,
        ),
      );
    } catch {
      setEdges((prev) => prev.filter((edge) => edge.id !== tempId));
    }
  };

  const handleNodeDragStop = (_event: React.MouseEvent, node: QuestNode) => {
    updateNodeMutation.mutate({
      nodeId: node.id,
      positionX: node.position.x,
      positionY: node.position.y,
    });
  };

  const handleDelete = (params: { nodes: QuestNode[]; edges: Edge[] }) => {
    params.nodes.map((node) =>
      deleteNodeMutation.mutate(node.id, {
        onError: () => {
          setNodes((prev) => [...prev, node]);
        },
      }),
    );
    params.edges.map((edge) =>
      deleteEdgeMutation.mutate(edge.id, {
        onError: () => {
          setEdges((prev) => [...prev, edge]);
        },
      }),
    );
  };

  useEffect(() => {
    if (!quest) return;

    setNodes(
      (quest.nodes ?? []).map((node) => ({
        id: node.id,
        type: "customNode",
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
      <div className="flex flex-col md:flex-row">
        <div className="h-[calc(100dvh-20rem)] w-full md:w-[calc(100dvw-20rem)] text-yellow-300 font-pixel">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={handleConnect}
            onNodeDragStop={handleNodeDragStop}
            onDelete={handleDelete}
            fitView
          ></ReactFlow>
        </div>
        <div className="flex items-center justify-center">
          <LinkButton text="Назад" url={`/quests/${questId}`} />
        </div>
      </div>
    </>
  );
};

export default Graph;
