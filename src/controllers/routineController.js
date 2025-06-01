import { getRoutineByPatientId } from '../services/routineService.js';

export const getRoutine = async (req, res) => {
  const { pacienteId } = req.params;

  if (!pacienteId) {
    return res.status(400).json({ success: false, message: "pacienteId es requerido" });
  }

  try {
    const result = await getRoutineByPatientId(Number(pacienteId));

    if (!result.success) {
      return res.status(404).json(result);
    }

    return res.json(result);

  } catch (error) {
    console.error("Error en getRoutine:", error);
    return res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};


