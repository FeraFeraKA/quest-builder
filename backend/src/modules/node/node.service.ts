import { HttpError } from "@/shared/error/httpError";
import { QuestStorage } from "../quest/quest.storage";
import { NodeStorage } from "./node.storage";
import type { INodePayload } from "./node.types";

export const NodeService = {
  async create({ data, userId }: INodePayload) {
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
};
