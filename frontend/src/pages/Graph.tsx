import {
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
} from "@xyflow/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { INodeCreate, INodeUpdate } from "../api/nodes";
import Editor from "../components/layout/Editor";
import CustomNode, { type QuestNode } from "../components/ui/CustomNode";
import useCreateEdge from "../hooks/edges/useCreateEdge";
import useDeleteEdge from "../hooks/edges/useDeleteEdge";
import useCreateNode from "../hooks/nodes/useCreateNode";
import useDeleteNode from "../hooks/nodes/useDeleteNode";
import useUpdateGraphNode from "../hooks/nodes/useUpdateGraphNode";
import useUpdateNode from "../hooks/nodes/useUpdateNode";
import useGetQuest from "../hooks/quests/useGetQuest";
import useSetStartNode from "../hooks/quests/useSetStartNode";

const nodeTypes = {
  customNode: CustomNode,
};

const Graph = () => {
  const params = useParams();
  const questId = params.id!;
  const { data: quest } = useGetQuest(questId);
  const setStartNodeMutation = useSetStartNode();
  const [nodes, setNodes, onNodesChange] = useNodesState<QuestNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedNodeId, setSelectedNodeId] = useState("");
  const [startNodeId, setStartNodeId] = useState("");
  const [graphHeight, setGraphHeight] = useState("calc(100dvh - 20rem)");
  const createNodeMutation = useCreateNode();
  const updateNodeMutatuon = useUpdateNode();
  const updateGraphNodeMutation = useUpdateGraphNode();
  const deleteNodeMutation = useDeleteNode();
  const createEdgeMutation = useCreateEdge();
  const deleteEdgeMutation = useDeleteEdge();

  const selectedNode = nodes.find((node) => node.id == selectedNodeId) ?? null;

  const handleCreateNode = async (
    e: React.SubmitEvent,
    {
      title,
      description,
    }: Omit<INodeCreate, "questId" | "positionX" | "positionY">,
  ) => {
    e.preventDefault();

    try {
      const createdNode = await createNodeMutation.mutateAsync({
        questId,
        title,
        description,
        positionX: 300,
        positionY: 300,
      });

      setNodes((prev) => [
        ...prev,
        {
          id: createdNode.id,
          type: "customNode",
          position: {
            x: createdNode.positionX,
            y: createdNode.positionY,
          },
          data: {
            label: createdNode.title,
            description: createdNode.description,
          },
        },
      ]);
    } catch (error) {
      console.error("Не удалось создать узел", error);
    }
  };

  const handleConnect = async (connection: Connection) => {
    const tempId = `temp-${crypto.randomUUID()}`;

    const tempEdge: Edge = {
      id: tempId,
      source: connection.source,
      target: connection.target,
      style: {
        stroke: "brown",
        strokeWidth: 2,
      },
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
    updateGraphNodeMutation.mutate({
      nodeId: node.id,
      positionX: node.position.x,
      positionY: node.position.y,
    });
  };

  const handleUpdateNode = async (
    e: React.SubmitEvent,
    { nodeId, title, description }: INodeUpdate,
  ) => {
    e.preventDefault();

    try {
      const updatedNode = await updateNodeMutatuon.mutateAsync({
        nodeId,
        title,
        description,
      });

      setNodes((prev) =>
        prev.map((node) =>
          node.id === nodeId
            ? {
                id: updatedNode.id,
                type: "customNode",
                position: {
                  x: updatedNode.positionX,
                  y: updatedNode.positionY,
                },
                data: {
                  label: updatedNode.title,
                  description: updatedNode.description,
                },
              }
            : node,
        ),
      );
    } catch (error) {
      console.error("Не получилось обновить ноду", error);
    }
  };

  const handleDelete = (params: { nodes: QuestNode[]; edges: Edge[] }) => {
    params.nodes.forEach((node) =>
      deleteNodeMutation.mutate(node.id, {
        onError: () => {
          setNodes((prev) => [...prev, node]);
        },
      }),
    );
    params.edges.forEach((edge) =>
      deleteEdgeMutation.mutate(edge.id, {
        onError: () => {
          setEdges((prev) => [...prev, edge]);
        },
      }),
    );
  };

  const handleNodeClick = (_event: React.MouseEvent, node: QuestNode) => {
    setSelectedNodeId(node.id);
  };

  const handlePaneClick = () => {
    setSelectedNodeId("");
  };

  const handleSetStartNode = async () => {
    if (!selectedNode) return;

    try {
      const updatedQuest = await setStartNodeMutation.mutateAsync({
        questId,
        startNodeId: selectedNodeId,
      });

      setStartNodeId(updatedQuest.startNodeId!);
    } catch (error) {
      console.error("Не удалось задать стартовую ноду", error);
    }
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

    if (!quest.startNodeId) return;

    setStartNodeId(quest.startNodeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quest?.id]);

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia("(min-width: 768px)");

    const updateGraphHeight = () => {
      if (desktopMediaQuery.matches) {
        const desktopHeight = Math.max(
          0,
          document.documentElement.scrollHeight - 320,
        );
        setGraphHeight(`${desktopHeight}px`);
        return;
      }

      setGraphHeight("calc(100dvh - 10rem)");
    };

    updateGraphHeight();

    desktopMediaQuery.addEventListener("change", updateGraphHeight);
    window.addEventListener("resize", updateGraphHeight);

    return () => {
      desktopMediaQuery.removeEventListener("change", updateGraphHeight);
      window.removeEventListener("resize", updateGraphHeight);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div
          className="w-full md:w-[calc(100dvw-25rem)] text-yellow-300 font-pixel border-2 border-amber-700"
          style={{ height: graphHeight }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={handleConnect}
            onNodeDragStop={handleNodeDragStop}
            onDelete={handleDelete}
            onNodeClick={handleNodeClick}
            onPaneClick={handlePaneClick}
            defaultEdgeOptions={{
              style: {
                stroke: "brown",
                strokeWidth: 4,
              },
              
            }}
            connectionLineStyle={{
              stroke: "brown",
              strokeWidth: 4,
            }}
            fitView
          ></ReactFlow>
        </div>
        <Editor
          questId={questId}
          selectedNode={selectedNode}
          startNodeId={startNodeId}
          handleCreateNode={handleCreateNode}
          handleUpdateNode={handleUpdateNode}
          handleSetStartNode={handleSetStartNode}
        />
      </div>
    </>
  );
};

export default Graph;
