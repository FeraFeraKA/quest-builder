import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import Card from "./Card";

type TCustomNodeData = {
  label: string;
  description: string;
};

export type QuestNode = Node<TCustomNodeData, "customNode">;

const CustomNode = ({ data, selected }: NodeProps<QuestNode>) => {
  return (
    <div>
      <Handle
        position={Position.Bottom}
        type="source"
        style={{ width: 18, height: 18, bottom: -9 }}
      />

      <Card
        className={`max-w-130 whitespace-normal wrap-break-word
      ${selected ? "brightness-120 transition-all duration-200" : ""}`}
      >
        <h1>{data.label}</h1>
        <h2>{data.description}</h2>
      </Card>

      <Handle
        position={Position.Top}
        type="target"
        style={{ width: 18, height: 18, top: -6 }}
      />
    </div>
  );
};

export default CustomNode;
