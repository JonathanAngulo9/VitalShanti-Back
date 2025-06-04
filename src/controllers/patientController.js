import {
  createPatient as createPatientService,
  getPatientsByInstructorId,
  updatePatient as updatePatientService,
  fetchSesionesByPaciente
} from "../services/patientService.js";
import { getPainOverTime } from "../services/sessionService.js";

import bcrypt from 'bcrypt'; // Asegúrate de tener instalado bcrypt

export const createPatient = async (req, res) => {
  try {
    const { firstName, lastName, identification, phone, email, password, instructorId } = req.body;

    // Hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await createPatientService(
      { firstName, lastName, identification, phone, email, password: hashedPassword },
      instructorId
    );

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);
  } catch (error) {
    console.error("Error al crear paciente:", error);
    return res.status(500).json({ success: false, message: "Error del servidor" });
  }
};


export const getPatientsByInstructor = async (req, res) => {
  try {
    const { instructorId } = req.query;

    if (!instructorId) {
      return res.status(400).json({ success: false, message: "instructorId es requerido" });
    }

    const patients = await getPatientsByInstructorId(parseInt(instructorId));
    return res.json({ success: true, patients });
  } catch (error) {
    console.error("Error al obtener pacientes:", error);
    return res.status(500).json({ success: false, message: "Error del servidor" });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await updatePatientService(parseInt(id), updateData);

    if (!result.success) {
      return res.status(404).json(result);
    }

    return res.json(result);
  } catch (error) {
    console.error("Error al actualizar paciente:", error);
    return res.status(500).json({ success: false, message: "Error del servidor" });
  }
};

export const getPainProgressByPatient = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id es requerido"
      });
    }

    const result = await getPainOverTime(parseInt(id));

    if (!result.success) {
      return res.status(404).json(result);
    }

    return res.json(result);
  } catch (error) {
    console.error("Error al obtener progreso de dolor:", error);
    return res.status(500).json({ success: false, message: "Error del servidor" });
  }
};

export const getSesionesByPaciente = async (req, res) => {
  const { idPaciente } = req.params;

  try {
    const sesiones = await fetchSesionesByPaciente(idPaciente);
    res.json({ success: true, data: sesiones });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al obtener sesiones del paciente." });
  }
};