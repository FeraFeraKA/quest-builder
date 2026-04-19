import { type IQuest } from "../types/quest.types";
import { fetcher } from "./fetcher";

export type TQuestId = string;

interface ICreateQuest {
  title: string;
  description: string;
}

export interface ISetStartNode {
  questId: TQuestId;
  startNodeId: string;
}

export const createQuest = async ({ title, description }: ICreateQuest) => {
  const quest = await fetcher<IQuest>({
    url: "/quests",
    method: "POST",
    body: { title, description },
  });

  return quest;
};

export const getQuests = async () => {
  const quests = await fetcher<IQuest[]>({
    url: "/quests",
    method: "GET",
  });

  return quests;
};

export const getQuest = async (questId: TQuestId) => {
  const quest = await fetcher<IQuest>({
    url: `/quests/${questId}`,
    method: "GET",
  });

  return quest;
};

export const setStartNode = async ({ questId, startNodeId }: ISetStartNode) => {
  const quest = await fetcher<IQuest>({
    url: `/quests/${questId}/startNode`,
    method: "PATCH",
    body: {
      startNodeId,
    },
  });

  return quest;
};

export const deleteQuest = async (questId: TQuestId) => {
  await fetcher<void>({
    url: `/quests/${questId}`,
    method: "DELETE",
  });
};
