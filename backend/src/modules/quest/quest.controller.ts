import type { Request, Response } from "express";
import {
  QuestDataSchema,
  QuestIdSchema,
  QuestUpdateDataSchema,
  StartNodeIdSchema,
} from "./quest.schema";
import { QuestService } from "./quest.service";
import type { TQuestId } from "./quest.types";

export const QuestController = {
  async create(req: Request, res: Response) {
    const body = QuestDataSchema.parse(req.body);
    const userId = req.user.id;
    const quest = await QuestService.create({ ...body, userId });
    res.status(201).json(quest);
  },

  async getQuests(req: Request, res: Response) {
    const userId = req.user.id;
    const quests = await QuestService.getQuests(userId);
    res.status(200).json(quests);
  },

  async getQuest(req: Request<TQuestId>, res: Response) {
    const questId = QuestIdSchema.parse(req.params.questId);
    const userId = req.user.id;
    const quest = await QuestService.getQuest({ questId, userId });
    res.status(200).json(quest);
  },

  async update(req: Request<TQuestId>, res: Response) {
    const questId = QuestIdSchema.parse(req.params.questId);
    const userId = req.user.id;
    const payload = QuestUpdateDataSchema.parse(req.body);
    const updatedQuest = await QuestService.update(payload, {
      questId,
      userId,
    });
    res.status(200).json(updatedQuest);
  },

  async setStartNode(req: Request<TQuestId>, res: Response) {
    const questId = QuestIdSchema.parse(req.params.questId);
    const userId = req.user.id;
    const startNodeId = StartNodeIdSchema.parse(req.body);
    const updatedQuest = await QuestService.setStartNode(startNodeId, {
      questId,
      userId,
    });
    res.status(200).json(updatedQuest);
  },

  async delete(req: Request<TQuestId>, res: Response) {
    const questId = QuestIdSchema.parse(req.params.questId);
    const userId = req.user.id;
    await QuestService.delete({ questId, userId });
    res.status(204).send();
  },
};
