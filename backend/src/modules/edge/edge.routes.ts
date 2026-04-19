import { Router } from "express";
import { EdgeController } from "./edge.controller.js";

const router: Router = Router();

router.post("/quests/:questId/edges", EdgeController.create);

router.patch("/edges/:edgeId", EdgeController.update);

router.delete("/edges/:edgeId", EdgeController.delete);

export default router;
