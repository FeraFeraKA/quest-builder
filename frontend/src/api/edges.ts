import { fetcher } from "./fetcher";
import type { TQuestID } from "./quests";

export interface ICreateEdge {
  questId: TQuestID;
  nodeFromId: string;
  nodeToId: string;
}

export const createEdge = async ({
  questId,
  nodeFromId,
  nodeToId,
}: ICreateEdge) => {
  const edge = await fetcher({
    url: `/api/quests/${questId}/edges`,
    method: "POST",
    body: {
      nodeFromId,
      nodeToId,
    },
  });

  return edge;
};
