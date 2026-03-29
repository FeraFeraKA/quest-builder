import type { TUserId } from "../auth/auth.types";
import type { TQuestId } from "../quest/quest.types";
import type { TEdge } from "./edge.schema";

export type TEdgeId = {
  edgeId: string;
};

export interface IEdgeData {
  data: TEdge;
  userId: TUserId;
}

export interface IEdgeUpdateData extends TEdgeId {
  data: Omit<TEdge, "questId">;
  questId: TQuestId["questId"];
  userId: TUserId;
}
