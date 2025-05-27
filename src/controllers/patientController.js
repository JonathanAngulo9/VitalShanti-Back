import { createPatient as createPatientService, getPatientsByInstructorId, updatePatient as updatePatientService } from "../services/patientService.js";

export const createPatient = (req, res) => {
    const { firstName, lastName, identification, phone, email, password, instructorId } = req.body;

    const result = createPatientService(
        { firstName, lastName, identification, phone, email, password },
        instructorId
    );

    if (!result.success) {
        return res.status(400).json(result);
    }

    return res.status(201).json(result);
};

export const getPatientsByInstructor = (req, res) => {
    const { instructorId } = req.query;

    if (!instructorId) {
        return res.status(400).json({ success: false, message: "instructorId es requerido" });
    }

    const patients = getPatientsByInstructorId(instructorId);
    return res.json({ success: true, patients });
};

export const updatePatient = (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    const result = updatePatientService(id, updateData);

    if (!result.success) {
        return res.status(404).json(result);
    }

    return res.json(result);
};

export const getPainProgressByPatient = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "id es requerido"
        });
    }

    const result = getPainOverTime(parseInt(id));

    if (!result.success) {
        return res.status(404).json(result);
    }

    return res.json(result);
};
