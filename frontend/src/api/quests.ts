import type { IQuest } from "../types/quest.types";
import { fetcher } from "./fetcher";

export type TQuestID = string;

interface ICreateQuest {
  title: string;
  description: string;
}

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

export const createQuest = async ({ title, description }: ICreateQuest) => {
  const quest = await fetcher<IQuest>({
    url: "/api/quests",
    method: "POST",
    body: { title, description },
  });

  return quest;
};

