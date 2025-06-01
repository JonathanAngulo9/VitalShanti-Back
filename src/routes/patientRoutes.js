import express from "express";
import { createPatient, getPatientsByInstructor, updatePatient, getPainProgressByPatient} from "../controllers/patientController.js";
import { getRoutine } from "../controllers/routineController.js";

const router = express.Router();

router.post("/", createPatient);
router.get("/", getPatientsByInstructor);
router.patch("/:id", updatePatient);
router.get("/progreso/:id", getPainProgressByPatient);
// Aquí se usa función del routineController
router.get("/rutina-activa/:pacienteId", getRoutine);

export default router;