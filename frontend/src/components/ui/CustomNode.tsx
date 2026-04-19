import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import Card from "./Card";

type TCustomNodeData = {
  label: string;
  description: string;
};

export type QuestNode = Node<TCustomNodeData, "customNode">;

const CustomNode = ({ data }: NodeProps<QuestNode>) => {
  return (
    <div>
      <Handle position={Position.Bottom} type="source" />

      <Card className="max-w-130 whitespace-normal wrap-break-word">
        <h1>{data.label}</h1>
        <h2>{data.description}</h2>
      </Card>

      <Handle position={Position.Top} type="target" />
    </div>
  );
};

export default CustomNode;
