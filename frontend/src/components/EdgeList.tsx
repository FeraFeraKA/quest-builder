import { useEffect, useState } from "react";
import type { IEdge } from "../types/quest.types";
import Edge from "./Edge";

const EdgeList = ({ edges }: { edges: IEdge[] }) => {
  const [error, setError] = useState<string>("");
  const deleteEdge = async (e: React.MouseEvent, id: string) => {

  };

  useEffect(() => {}, [edges]);
  return (
    <>
      <p>Your edges: </p>
      <div className="flex justify-center">
        {edges.map((edge) => (
          <Edge
            key={edge.id}
            id={edge.id}
            nodeFromId={edge.nodeFromId}
            nodeToId={edge.nodeToId}
            deleteEdge={deleteEdge}
          />
        ))}
        {error && <p>{error}</p>}
      </div>
    </>
  );
};

export default EdgeList;
