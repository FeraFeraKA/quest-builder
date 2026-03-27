import type { Request, Response } from "express";
import { PartialQuestDataSchema, QuestDataSchema, QuestIdSchema } from "./quest.schema";
import { QuestService } from "./quest.service";

export const QuestController = {
  async create(req: Request, res: Response) {
    const body = QuestDataSchema.parse(req.body);
    const quest = await QuestService.create(body);
    res.status(201).json(quest);
  },

  async getQuests(req: Request, res: Response) {
    const userId = req.user.id;
    const quests = await QuestService.getQuests(userId);
    res.status(200).json(quests);
  },

  async getQuest(req: Request, res: Response) {
    const questId = QuestIdSchema.parse(req.params);
    const userId = req.user.id;
    const quest = await QuestService.getQuest({ questId, userId });
    res.status(200).json(quest);
  },

  async update(req: Request, res: Response) {
    const questId = QuestIdSchema.parse(req.params);
    const userId = req.user.id;
    const body = PartialQuestDataSchema.parse(req.body);
    const updatedQuest = await QuestService.update({ questId, userId, body });
    res.status(200).json(updatedQuest);
  },

  async delete(req: Request, res: Response) {
    const questId = QuestIdSchema.parse(req.params);
    const userId = req.user.id;
    await QuestService.delete({ questId, userId });
    res.status(204);
  },
};
