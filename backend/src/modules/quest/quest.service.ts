import { HttpError } from "@/shared/error/httpError";
import { removeUndefined } from "@/shared/helpers/removeUndefined";
import type { TUserId } from "../auth/auth.types";
import type { TQuestUpdateData } from "./quest.schema";
import { QuestStorage } from "./quest.storage";
import type { IQuestCredentials, IQuestData } from "./quest.types";

export const QuestService = {
  async create(data: IQuestData) {
    const quest = await QuestStorage.create(data);

    if (!quest) {
      throw new HttpError(400, "INVALID_DATA", "Invalid data");
    }

    return quest;
  },

  async getQuests(userId: TUserId) {
    const quests = await QuestStorage.getQuests(userId);

    if (!quests) {
      throw new HttpError(401, "UNAUTHORIZED", "Unauthorized");
    }

    return quests;
  },

  async getQuest(payload: IQuestCredentials) {
    const quest = await QuestStorage.getQuest(payload);

    if (!quest) {
      throw new HttpError(404, "NOT_FOUND", "Quest not found");
    }

    return quest;
  },

  async update(payload: TQuestUpdateData, credentials: IQuestCredentials) {
    const updatedAt = new Date();
    const data = removeUndefined({ ...payload, updatedAt });

    const updatedQuest = await QuestStorage.update(data, credentials);

    if (!updatedQuest) {
      throw new HttpError(404, "NOT_FOUND", "Quest not found");
    }

    return updatedQuest;
  },

  async delete(payload: IQuestCredentials) {
    const quest = await QuestStorage.getQuest(payload);

    if (!quest) {
      throw new HttpError(404, "NOT_FOUND", "Quest not found");
    }

    return QuestStorage.delete(payload);
  },
};
