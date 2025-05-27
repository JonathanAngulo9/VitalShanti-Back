import mockData from '../data/mockData2.js';

export const createPatient = (patientData, instructorId) => {
    const { email } = patientData;

    const existingUser = mockData.users.find(u => u.email === email);
    if (existingUser) {
        return { success: false, message: "El correo ya está registrado" };
    }

    const newPatient = {
        id: mockData.users.length + 1,
        role: "Paciente",
        ...patientData
    };

    mockData.users.push(newPatient);

    mockData.instructorPatients.push({
        id: mockData.instructorPatients.length + 1,
        instructorId,
        patientId: newPatient.id
    });

    return { success: true, patient: newPatient };
};

export const getPatientsByInstructorId = (instructorId) => {
    const relatedPatients = mockData.instructorPatients
        .filter(rel => rel.instructorId === parseInt(instructorId))
        .map(rel => mockData.users.find(u => u.id === rel.patientId));

    return relatedPatients;
};

export const updatePatient = (id, updateData) => {
    const patient = mockData.users.find(u => u.id === parseInt(id) && u.role === "Paciente");

    if (!patient) {
        return { success: false, message: "Paciente no encontrado" };
    }

    Object.assign(patient, updateData);

    return { success: true, patient };
};
