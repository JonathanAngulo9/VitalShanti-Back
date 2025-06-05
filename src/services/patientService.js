import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Crea un nuevo paciente y lo vincula a un instructor
 */
export const createPatient = async (patientData, instructorId) => {
  const { email } = patientData;

  // Verificar si el correo ya está registrado
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return { success: false, message: "El correo ya está registrado" };
  }

  // Crear nuevo paciente
  const newPatient = await prisma.user.create({
    data: {
      ...patientData,
      role: 'Paciente',
    }
  });

  // Asociar al instructor
  await prisma.instructorPatient.create({
    data: {
      instructorId,
      patientId: newPatient.id
    }
  });

  return { success: true, patient: newPatient };
};

/**
 * Obtener pacientes asignados a un instructor
 */
export const getPatientsByInstructorId = async (instructorId) => {
  const patients = await prisma.instructorPatient.findMany({
    where: { instructorId: parseInt(instructorId) },
    include: {
      patient: true,
    }
  });

  return patients.map(p => p.patient);
};

/**
 * Actualizar información del paciente
 */
export const updatePatient = async (id, updateData) => {
  // Verificar existencia y rol
  const existing = await prisma.user.findFirst({
    where: {
      id: parseInt(id),
      role: 'Paciente',
    }
  });

  if (!existing) {
    return { success: false, message: "Paciente no encontrado" };
  }

  const updated = await prisma.user.update({
    where: { id: parseInt(id) },
    data: updateData
  });

  return { success: true, patient: updated };
};

export const fetchSesionesByPaciente = async (idPaciente) => {
  const sesiones = await prisma.session.findMany({
    where: {
      patientSeries: {
        patientId: parseInt(idPaciente),
      },
    },
    select: {
      id: true,
      startedAt: true,
      endedAt: true,
      pauses: true,
      effectiveMinutes: true,
      comment: true,
      painBefore: { select: { name: true} },
      painAfter: { select: { name: true } },
    },
    orderBy: {
      startedAt: 'desc',
    },
  });

  return sesiones;
};
