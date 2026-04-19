import type { Prisma } from "./../../../generated/prisma/client.js";
import type { TUserId } from "../auth/auth.types.js";
import type { TNode, TPartialNode } from "./node.schema.js";

export type TNodeId = {
  nodeId: string;
};

export interface INodeCreateData {
  data: TNode;
  userId: TUserId;
}

export interface INodePayload extends TNodeId {
  userId: TUserId;
}

export interface INodeUpdatePayload extends INodePayload {
  payload: TPartialNode;
}

export interface INodeUpdateData extends INodePayload {
  data: Prisma.NodeUpdateInput;
}
