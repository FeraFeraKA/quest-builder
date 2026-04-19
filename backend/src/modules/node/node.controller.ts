import type { Request, Response } from "express";
import { QuestIdSchema } from "../quest/quest.schema.js";
import type { TQuestId } from "../quest/quest.types.js";
import { NodeIdSchema, NodeSchema, PartialNodeSchema } from "./node.schema.js";
import { NodeService } from "./node.service.js";
import type { TNodeId } from "./node.types.js";

export const NodeController = {
  async create(req: Request<TQuestId>, res: Response) {
    const questId = QuestIdSchema.parse(req.params.questId);
    const userId = req.user.id;
    const parsedData = NodeSchema.parse(req.body);
    const data = { ...parsedData, questId };
    const node = await NodeService.create({ data, userId });
    res.status(201).json(node);
  },

  async update(req: Request<TNodeId>, res: Response) {
    const nodeId = NodeIdSchema.parse(req.params.nodeId);
    const userId = req.user.id;
    const payload = PartialNodeSchema.parse(req.body);
    const updatedNode = await NodeService.update({ payload, nodeId, userId });
    res.status(200).json(updatedNode);
  },

  async delete(req: Request<TNodeId>, res: Response) {
    const nodeId = NodeIdSchema.parse(req.params.nodeId);
    const userId = req.user.id;
    await NodeService.delete({ nodeId, userId });
    res.status(204).send();
  },
};
