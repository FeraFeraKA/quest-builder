import { HttpError } from "@/shared/error/httpError";
import { removeUndefined } from "@/shared/helpers/removeUndefined";
import type { Prisma } from "generated/prisma/client";
import { QuestStorage } from "../quest/quest.storage";
import { NodeStorage } from "./node.storage";
import type {
  INodeCreateData,
  INodePayload,
  INodeUpdatePayload,
} from "./node.types";

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
    const data: Prisma.NodeUpdateInput = removeUndefined(payload);
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
