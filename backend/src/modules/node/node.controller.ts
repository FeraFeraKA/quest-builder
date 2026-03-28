import type { Request, Response } from "express";
import type { TQuestId } from "../quest/quest.types";
import { NodeSchema } from "./node.schema";
import { NodeService } from "./node.service";
import type { TNodeId } from "./node.types";

export const NodeController = {
  async create(req: Request<TQuestId>, res: Response) {
    const questId = req.params.questId;
    const parsedData = NodeSchema.parse(req.body);
    const data = { ...parsedData, questId };
    const userId = req.user.id;
    const node = await NodeService.create({ data, userId });
    res.status(201).json(node);
  },

  async delete(req: Request<TNodeId>, res: Response) {
    const nodeId = req.params.nodeId;
    const userId = req.user.id;
    await NodeService.delete({ nodeId, userId });
    res.status(204).send();
  },
};
