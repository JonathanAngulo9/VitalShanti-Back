import express from "express";
import { 
    createPatient, 
    getPatientsByInstructor, 
    updatePatient, 
    getPainProgressByPatient, 
    getSesionesByPaciente 
} from "../controllers/patientController.js";
import { getRoutine } from "../controllers/routineController.js";

const router = express.Router();

router.post("/", createPatient);
router.get("/", getPatientsByInstructor);
router.patch("/:id", updatePatient);
router.get("/progreso/:id", getPainProgressByPatient);
router.get("/rutina-activa/:pacienteId", getRoutine);
router.get("/sesiones/:idPaciente", getSesionesByPaciente);

export default router;