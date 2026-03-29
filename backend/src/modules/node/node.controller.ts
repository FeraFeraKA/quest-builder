import type { Request, Response } from "express";
import type { TQuestId } from "../quest/quest.types";
import { NodeSchema, PartialNodeSchema } from "./node.schema";
import { NodeService } from "./node.service";
import type { TNodeId } from "./node.types";

export const NodeController = {
  async create(req: Request<TQuestId>, res: Response) {
    const questId = req.params.questId;
    const userId = req.user.id;
    const parsedData = NodeSchema.parse(req.body);
    const data = { ...parsedData, questId };
    const node = await NodeService.create({ data, userId });
    res.status(201).json(node);
  },

  async update(req: Request<TNodeId>, res: Response) {
    const nodeId = req.params.nodeId;
    const userId = req.user.id;
    const payload = PartialNodeSchema.parse(req.body);
    const updatedNode = await NodeService.update({ payload, nodeId, userId });
    res.status(200).json(updatedNode);
  },

  async delete(req: Request<TNodeId>, res: Response) {
    const nodeId = req.params.nodeId;
    const userId = req.user.id;
    await NodeService.delete({ nodeId, userId });
    res.status(204).send();
  },
};
