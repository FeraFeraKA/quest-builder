import type { INode } from "../../types/quest.types";
import Node from "../ui/Node";

type TNodeListProps = {
  nodes: INode[];
};

const NodeList = ({ nodes }: TNodeListProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center items-center">
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
