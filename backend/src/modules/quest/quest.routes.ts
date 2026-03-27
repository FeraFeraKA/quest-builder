import { Router } from "express";
import { QuestController } from "./quest.controller";

const router: Router = Router();

router.post("/", QuestController.create);

router.get("/", QuestController.getQuests);

router.get("/:questId", QuestController.getQuest);

router.patch("/:questId", QuestController.update);

router.delete("/:questId", QuestController.delete);

export default router;
