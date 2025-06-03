import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { crearRutina, obtenerPosturas, obtenerTerapias } from '../controllers/instructorController.js';
const router = express.Router();

router.post('/rutinas', authMiddleware, crearRutina);
router.get('/posturas', obtenerPosturas);
router.get('/terapias', obtenerTerapias);

export default router;
