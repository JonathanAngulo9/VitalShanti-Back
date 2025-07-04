import express from "express";
import { createSessionController } from "../controllers/sessionController.js";

const router = express.Router();

router.post("/", createSessionController);
// router.patch("/:id", updateSessionController);

export default router;
