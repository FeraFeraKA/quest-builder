import { HttpError } from "./../../shared/error/httpError.js";
import { removeUndefined } from "./../../shared/helpers/removeUndefined.js";
import { QuestStorage } from "../quest/quest.storage.js";
import { NodeStorage } from "./node.storage.js";
import type {
  INodeCreateData,
  INodePayload,
  INodeUpdatePayload,
} from "./node.types.js";

export const NodeService = {
  async create({ data, userId }: INodeCreateData) {
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

  async update({ payload, nodeId, userId }: INodeUpdatePayload) {
    const updatedAt = new Date();
    const data = removeUndefined({ ...payload, updatedAt });
    const { count } = await NodeStorage.update({
      data,
      nodeId,
      userId,
    });

    if (count === 0) {
      throw new HttpError(404, "NOT_FOUND", "Node not found");
    }

    const updatedNode = await NodeStorage.getById({ nodeId, userId });

    if (!updatedNode) {
      throw new HttpError(404, "NOT_FOUND", "Node not found");
    }

    return updatedNode;
  },

  async delete({ nodeId, userId }: INodePayload) {
    const { count } = await NodeStorage.delete({ nodeId, userId });

    if (count === 0) {
      throw new HttpError(404, "NOT_FOUND", "Node not found");
    }

    return;
  },
};
