import { HttpError } from "@/shared/error/httpError";
import { QuestStorage } from "../quest/quest.storage";
import { NodeStorage } from "./node.storage";
import type { INodeCreatePayload, INodeDeletePayload } from "./node.types";

export const NodeService = {
  async create({ data, userId }: INodeCreatePayload) {
    const quest = await QuestStorage.getQuest({
      questId: data.questId,
      userId,
    });

    if (!quest) {
      throw new HttpError(404, "NOT_FOUND", "Quest not found");
    }

    const node = await NodeStorage.create(data);

    if (!node) {
      throw new HttpError(400, "INVALID_DATA", "Invalid data");
    }

    return node;
  },

  async delete({ nodeId, userId }: INodeDeletePayload) {
    const { count } = await NodeStorage.delete({ nodeId, userId });

    if (count === 0) {
      throw new HttpError(404, "NOT_FOUND", "Node not found");
    }

    return;
  },
};
