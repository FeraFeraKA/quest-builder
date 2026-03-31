import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import EdgeList from "../components/EdgeList";
import NodeList from "../components/NodeList";
import type { IEdge, INode, IQuest } from "../types/quest.types";

const Editor = () => {
  const params = useParams();
  const questId = params.questId;
  const [error, setError] = useState<string>("");
  const [nodes, setNodes] = useState<INode[]>([]);
  const [edges, setEdges] = useState<IEdge[]>([]);

  useEffect(() => {
    const loadQuest = async () => {
      try {
        const res = await fetch(`/api/quests/${questId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Cannot get quest");
        }

        const quest: IQuest = await res.json();
        setNodes(quest.nodes);
        setEdges(quest.edges);
      } catch {
        setError("Что-то сломалось");
      }
    };

    loadQuest();
  }, [questId, nodes, edges]);

  return (
    <>
      <div className="flex flex-col justify-center gap-4 m-3 text-3xl text-center">
        <h1 className="">It's editor!</h1>
        <NodeList nodes={nodes} setNodes={setNodes} questId={questId} />
        <EdgeList edges={edges} />
        {error && <p>{error}</p>}
        <Link
          to="/quests"
          className="cursor-pointer p-3 border-2 border-blue-300"
        >
          Back to quests
        </Link>
      </div>
    </>
  );
};

export default Editor;
