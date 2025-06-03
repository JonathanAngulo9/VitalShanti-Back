import {
  crearRutina as crearRutinaService,
  obtenerPosturas as obtenerPosturasService,
    obtenerTerapias as obtenerTerapiasService
} from '../services/instructorService.js';

export const crearRutina = async (req, res) => {
  try {
    const { pacienteId, nombre, tipoTerapiaId, sesionesRecom, posturas } = req.body;

    // Obtener instructorId desde el contexto, por ejemplo req.user.id
    const instructorId = req.user?.id;

    if (!instructorId) {
      return res.status(401).json({ success: false, message: "Instructor no autenticado" });
    }

    const rutina = await crearRutinaService(
        { pacienteId, nombre, tipoTerapiaId, sesionesRecom, posturas },
        instructorId
    );

    return res.status(201).json({ success: true, rutina });
  } catch (error) {
    console.error("Error al crear rutina:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const obtenerPosturas = async (req, res) => {
  try {
    const posturas = await obtenerPosturasService();
    return res.json({ success: true, posturas });
  } catch (error) {
    console.error("Error al obtener posturas:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const obtenerTerapias = async (req, res) => {
  try {
    const terapias = await obtenerTerapiasService();
    return res.json(terapias); // Asumiendo que devuelves array directamente
  } catch (error) {
    console.error("Error al obtener terapias:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


