export type TQuestId = {
  questId: string;
};

export type TTitle = string;

export type TDescription = string;

export interface IQuestData {
  title: string;
  description: string;
  userId: string;
}

export interface IQuestCredentials {
  questId: string;
  userId: string;
}

export interface IQuestUpdate extends IQuestCredentials {
  updatedAt: Date;
}
