import type { TUserId } from "../auth/auth.types";
import type { TEdge } from "./edge.schema";

export interface ICreateEdge {
  data: TEdge;
  userId: TUserId
}
