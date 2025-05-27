import express from "express";
import { createPatient, getPatientsByInstructor, updatePatient } from "../controllers/patientController.js";

const router = express.Router();

router.post("/", createPatient);
router.get("/", getPatientsByInstructor);
router.patch("/:id", updatePatient);

router.get("/progreso/:id", getPainProgressByPatient);

export default router;