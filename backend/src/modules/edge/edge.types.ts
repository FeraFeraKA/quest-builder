import type { TUserId } from "../auth/auth.types.js";
import type { TNodeId } from "../node/node.types.js";
import type { TQuestId } from "../quest/quest.types.js";
import type { TEdge } from "./edge.schema.js";

export type TEdgeId = {
  edgeId: string;
};

export interface IEdgeGet {
  nodeFromId: TNodeId["nodeId"];
  nodeToId: TNodeId["nodeId"];
  userId: TUserId;
}

export interface IEdgeIds extends TEdgeId {
  userId: TUserId;
}

export interface IEdgeData {
  data: TEdge;
  userId: TUserId;
}

export interface IEdgeUpdateData extends IEdgeIds {
  data: Omit<TEdge, "questId">;
  questId: TQuestId["questId"];
  updatedAt: Date;
}
