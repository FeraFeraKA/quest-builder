import { HttpError } from "@/shared/error/httpError";
import { QuestStorage } from "../quest/quest.storage";
import { EdgeStorage } from "./edge.storage";
import type { ICreateEdge } from "./edge.types";

export const EdgeService = {
  async create({ data, userId }: ICreateEdge) {
    const quest = await QuestStorage.getQuest({
      questId: data.questId,
      userId,
    });

    if (!quest) {
      throw new HttpError(404, "NOT_FOUND", "Quest not found");
    }

    const edge = await EdgeStorage.create(data);

    if (!edge) {
      throw new HttpError(400, "INVALID_DATA", "Invalid data");
    }

    return edge;
  },
};
