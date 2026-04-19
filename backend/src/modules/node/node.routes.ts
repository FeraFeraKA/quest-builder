import { Router } from "express";
import { NodeController } from "./node.controller.js";

const router: Router = Router();

router.post("/quests/:questId/nodes", NodeController.create);

router.patch("/nodes/:nodeId", NodeController.update);

router.delete("/nodes/:nodeId", NodeController.delete);

export default router;
