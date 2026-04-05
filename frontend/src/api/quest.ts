import type { IQuest } from "../types/quest.types";
import { fetcher } from "./fetcher";

export const getQuests = async () => {
  const quests = await fetcher<IQuest[]>({
    url: "/api/quests",
    method: "GET",
  });

  return quests;
};
