import type { TNode } from "./node.schema";

export interface INodePayload {
  data: TNode;
  userId: string;
}
