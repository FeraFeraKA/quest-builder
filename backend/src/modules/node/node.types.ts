import type { TNode } from "./node.schema";

export interface INodeCreatePayload {
  data: TNode;
  userId: string;
}

export type TNodeId = {
  nodeId: string;
};

export interface INodeDeletePayload extends TNodeId {
  userId: string;
}
