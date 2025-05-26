import express from "express";
import { login, registerInstructor, registerPaciente } from '../controllers/authController.js';

const router = express.Router();

router.post("/login", login);
router.post("/register/instructor", registerInstructor);
router.post("/register/paciente", registerPaciente);

export default router;
