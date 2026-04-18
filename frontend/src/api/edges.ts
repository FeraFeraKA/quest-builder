import type { IEdge } from "../types/quest.types";
import { fetcher } from "./fetcher";
import type { TQuestId } from "./quests";

export type TEdgeId = string;

export interface ICreateEdge {
  questId: TQuestId;
  nodeFromId: string;
  nodeToId: string;
}

export const createEdge = async ({
  questId,
  nodeFromId,
  nodeToId,
}: ICreateEdge) => {
  const edge = await fetcher<IEdge>({
    url: `/api/quests/${questId}/edges`,
    method: "POST",
    body: {
      nodeFromId,
      nodeToId,
    },
  });

  return edge;
};

export const deleteEdge = async (edgeId: TEdgeId) => {
  await fetcher({
    url: `/api/edges/${edgeId}`,
    method: "DELETE",
  });
};
