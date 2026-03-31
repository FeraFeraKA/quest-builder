import type { Request, Response } from "express";
import { QuestIdSchema } from "../quest/quest.schema";
import type { TQuestId } from "../quest/quest.types";
import { EdgeIdSchema, EdgeSchema } from "./edge.schema";
import { EdgeService } from "./edge.service";
import type { TEdgeId } from "./edge.types";

export const EdgeController = {
  async create(req: Request<TQuestId>, res: Response) {
    const questId = QuestIdSchema.parse(req.params.questId);
    const userId = req.user.id;
    const parsedData = EdgeSchema.parse(req.body);
    const data = { ...parsedData, questId };
    const edge = await EdgeService.create({ data, userId });
    res.status(201).json(edge);
  },

  async update(req: Request<TEdgeId & TQuestId>, res: Response) {
    const edgeId = EdgeIdSchema.parse(req.params.edgeId);
    const userId = req.user.id;
    const questId = QuestIdSchema.parse(req.params.questId);
    const data = EdgeSchema.parse(req.body);
    const updatedEdge = await EdgeService.update({
      data,
      questId,
      edgeId,
      userId,
    });
    res.status(200).json(updatedEdge);
  },

  async delete(req: Request<TEdgeId & TQuestId>, res: Response) {
    const edgeId = EdgeIdSchema.parse(req.params.edgeId);
    const userId = req.user.id;
    await EdgeService.delete({ edgeId, userId });
    res.status(204).send();
  },
};
