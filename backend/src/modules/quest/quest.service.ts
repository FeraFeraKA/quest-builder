import { HttpError } from "@/shared/error/httpError";
import { removeUndefined } from "@/shared/helpers/removeUndefined";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import type { TUserId } from "../auth/auth.types";
import { NodeStorage } from "../node/node.storage";
import type { TQuestUpdateData } from "./quest.schema";
import { QuestStorage } from "./quest.storage";
import type {
  IQuestCredentials,
  IQuestData,
  TStartNodeId,
} from "./quest.types";

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

    try {
      const updatedQuest = await QuestStorage.update(data, credentials);

      return updatedQuest;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
        throw new HttpError(404, "NOT_FOUND", "Quest not found");
      }
      throw e;
    }
  },

  async setStartNode(
    startNodeId: TStartNodeId,
    credentials: IQuestCredentials,
  ) {
    const updatedAt = new Date();
    const nodeId = startNodeId["startNodeId"];

    const node = await NodeStorage.getByQuestId({
      questId: credentials.questId,
      nodeId,
      userId: credentials.userId,
    });

    if (!node) {
      throw new HttpError(404, "NOT_FOUND", "Node not found");
    }

    try {
      const updatedQuest = await QuestStorage.update(
        { ...startNodeId, updatedAt },
        credentials,
      );

      return updatedQuest;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
        throw new HttpError(404, "NOT_FOUND", "Quest not found");
      }
      throw e;
    }
  },

  async delete(payload: IQuestCredentials) {
    try {
      await QuestStorage.delete(payload);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
        throw new HttpError(404, "NOT_FOUND", "Quest not found");
      }
      throw e;
    }
  },
};
