import { HttpError } from "@/shared/error/httpError";
import type { TUserId } from "../auth/auth.types";
import { QuestStorage } from "./quest.storage";
import type {
  IQuestCredentials,
  IQuestData,
  IQuestUpdate,
} from "./quest.types";

export const QuestService = {
  async create(body: IQuestData) {
    const quest = await QuestStorage.create(body);

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
      throw new HttpError(401, "UNAUTHORIZED", "Unauthorized");
    }

    return quest;
  },

  async update(payload: IQuestUpdate) {
    const updatedQuest = await QuestStorage.update(payload);

    if (!updatedQuest) {
      throw new HttpError(401, "UNAUTHORIZED", "Unauthorized");
    }

    return updatedQuest;
  },

  async delete(payload: IQuestCredentials) {
    const isDeleted = await QuestStorage.delete(payload);

    if (!isDeleted) {
      throw new HttpError(401, "UNAUTHORIZED", "Unauthorized");
    }

    return true;
  }
};
