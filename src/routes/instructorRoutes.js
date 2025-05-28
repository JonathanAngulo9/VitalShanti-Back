import express from 'express';
import { crearRutina, obtenerPosturas } from '../controllers/instructorController.js';
const router = express.Router();

router.post('/rutinas', crearRutina);
router.get('/posturas', obtenerPosturas);

export default router;
