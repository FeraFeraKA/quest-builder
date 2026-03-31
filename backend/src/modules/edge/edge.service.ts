import { HttpError } from "@/shared/error/httpError";
import { NodeStorage } from "../node/node.storage";
import { QuestStorage } from "../quest/quest.storage";
import { EdgeStorage } from "./edge.storage";
import type { IEdgeData, IEdgeIds, IEdgeUpdateData } from "./edge.types";

export const EdgeService = {
  async create({ data, userId }: IEdgeData) {
    const quest = await QuestStorage.getQuest({
      questId: data.questId,
      userId,
    });

    if (!quest) {
      throw new HttpError(404, "NOT_FOUND", "Quest not found");
    }

    const nodeFrom = await NodeStorage.getById({
      nodeId: data.nodeFromId,
      userId,
    });
    const nodeTo = await NodeStorage.getById({ nodeId: data.nodeToId, userId });

    if (!nodeFrom || !nodeTo) {
      throw new HttpError(404, "NOT_FOUND", "Node not found");
    }

    const edge = await EdgeStorage.create(data);

    if (!edge) {
      throw new HttpError(400, "INVALID_DATA", "Invalid data");
    }

    return edge;
  },

  async update({
    data,
    questId,
    edgeId,
    userId,
  }: Omit<IEdgeUpdateData, "updatedAt">) {
    const nodeFromId = data.nodeFromId;
    const nodeToId = data.nodeToId;
    const updatedAt = new Date();

    const nodeFrom = await NodeStorage.getByQuestId({
      questId,
      nodeId: nodeFromId,
      userId,
    });
    const nodeTo = await NodeStorage.getByQuestId({
      questId,
      nodeId: nodeToId,
      userId,
    });

    if (!nodeFrom || !nodeTo) {
      throw new HttpError(404, "NOT_FOUND", "Node not found");
    }

    const { count } = await EdgeStorage.update({
      data,
      questId,
      edgeId,
      userId,
      updatedAt,
    });

    if (count === 0) {
      throw new HttpError(404, "NOT_FOUND", "Edge not found");
    }

    const updatedEdge = await EdgeStorage.getById({ edgeId, userId });

    if (!updatedEdge) {
      throw new HttpError(404, "NOT_FOUND", "Edge not found");
    }

    return updatedEdge;
  },

  async delete({ edgeId, userId }: IEdgeIds) {
    const { count } = await EdgeStorage.delete({ edgeId, userId });

    if (count === 0) {
      throw new HttpError(404, "NOT_FOUND", "Edge not found");
    }

    return;
  },
};
