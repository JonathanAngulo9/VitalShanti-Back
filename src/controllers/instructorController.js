import {
    crearRutina as crearRutinaService,
    obtenerPosturas as obtenerPosturasService
} from '../services/instructorService.js';

export const crearRutina = (req, res) => {
    try {
        const { pacienteId, nombre, tipoTerapiaId, sesionesRecom, posturas } = req.body;
        const instructorId = req.instructorId;

        const rutina = crearRutinaService({ pacienteId, nombre, tipoTerapiaId, sesionesRecom, posturas }, instructorId);

        return res.status(201).json({ success: true, rutina });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const obtenerPosturas = (req, res) => {
    try {
        const posturas = obtenerPosturasService();
        return res.json({ success: true, posturas });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
