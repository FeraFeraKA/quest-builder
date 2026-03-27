import type { TPartialQuestData } from "./quest.schema";

export interface IQuestData {
  title: string;
  description: string;
}

export interface IQuestCredentials {
  questId: string;
  userId: string;
}

export interface IQuestUpdate extends IQuestCredentials {
  body: TPartialQuestData;
}
