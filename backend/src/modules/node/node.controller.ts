import type { Request, Response } from "express";
import type { TQuestId } from "../quest/quest.types";
import { NodeSchema } from "./node.schema";
import { NodeService } from "./node.service";

export const NodeController = {
  async create(req: Request<TQuestId>, res: Response) {
    const questId = req.params.questId;
    const parsedData = NodeSchema.parse(req.body);
    const data = { ...parsedData, questId };
    const userId = req.user.id;
    const node = await NodeService.create({ data, userId });
    res.status(201).json(node);
  },
};
