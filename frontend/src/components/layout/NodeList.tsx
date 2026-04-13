import type { INode } from "../../types/quest.types";
import Node from "../ui/Node";

type TNodeListProps = {
  nodes: INode[];
};

const NodeList = ({ nodes }: TNodeListProps) => {
  return (
    <>
      <p className="font-pixel text-yellow-300">Твои узлы (события): </p>
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
