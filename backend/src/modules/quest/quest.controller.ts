import type { Request, Response } from "express";
import { QuestService } from "./quest.service";

export const QuestController = {
  async create(req: Request, res: Response) {
    const body = req.body;
    const quest = await QuestService.create(body);
    res.status(201).json(quest);
  },

  async getQuests(req: Request, res: Response) {
    const userId = req.user.id;
    const quests = await QuestService.getQuests(userId);
    res.status(200).json(quests);
  },

  async getQuest(req: Request, res: Response) {
    const questId = req.params;
    const quest = await QuestService.getQuest(questId);
    res.status(200).json(quest);
  },

  async update(req: Request, res: Response) {
    const questId = req.params;
    const updatedQuest = await QuestService.update(questId);
    res.status(200).json(updatedQuest);
  },
};
