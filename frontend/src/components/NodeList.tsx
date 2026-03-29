import type { INode } from "../types/quest.types";
import Node from "./Node";

const NodeList = ({ nodes }: { nodes: INode[] }) => {
  return (
    <>
      <p>Your nodes: </p>
      <div className="flex justify-center">
        {nodes.map((node) => (
          <Node
            key={node.id}
            title={node.title}
            description={node.description}
          />
        ))}
      </div>
    </>
  );
};

export default NodeList;
