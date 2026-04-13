import type { INode } from "../../types/quest.types";
import Node from "../ui/Node";

type TNodeListProps = {
  nodes: INode[];
};

const NodeList = ({ nodes }: TNodeListProps) => {
  return (
    <>
      <p className="font-pixel text-yellow-300">Your nodes: </p>
      <div className="flex justify-center">
        {nodes.map((node) => (
          <Node
            key={node.id}
            id={node.id}
            title={node.title}
            description={node.description}
          />
        ))}
      </div>
    </>
  );
};

export default NodeList;
