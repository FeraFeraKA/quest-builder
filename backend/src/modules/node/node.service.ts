import { HttpError } from "@/shared/error/httpError";
import { QuestStorage } from "../quest/quest.storage";
import { NodeStorage } from "./node.storage";
import type { INodePayload } from "./node.types";

export const NodeService = {
  async create(payload: INodePayload) {
    const quest = QuestStorage.getQuest({
      questId: payload.data.questId,
      userId: payload.userId,
    });

    if (!quest) {
      throw new HttpError(404, "NOT_FOUND", "Quest not found");
    }

    const node = await NodeStorage.create(payload.data);

    if (!node) {
      throw new HttpError(400, "INVALID_DATA", "Invalid data");
    }

    return node;
  },
};
