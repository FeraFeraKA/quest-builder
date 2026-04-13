import type { IQuest } from "../types/quest.types";
import { fetcher } from "./fetcher";

export type TQuestID = string;

export const getQuests = async () => {
  const quests = await fetcher<IQuest[]>({
    url: "/api/quests",
    method: "GET",
  });

  return quests;
};

export const getQuest = async (id: TQuestID) => {
  const quest = await fetcher<IQuest>({
    url: `/api/quests/${id}`,
    method: "GET",
  });

  return quest;
};
