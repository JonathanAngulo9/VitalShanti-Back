import express from 'express';
import { crearRutina, obtenerPosturas, obtenerTerapias } from '../controllers/instructorController.js';
const router = express.Router();

router.post('/rutinas', crearRutina);
router.get('/posturas', obtenerPosturas);
router.get('/terapias', obtenerTerapias);

export default router;
