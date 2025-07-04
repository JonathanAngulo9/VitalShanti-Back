import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';
const saltRounds = 10;


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

  const instructor = await prisma.user.findUnique({
    where: { id: parseInt(instructorId, 10) }
  });

  if (!instructor || instructor.role !== 'Instructor') {
    return { success: false, message: "Instructor no válido" };
  }

  const hashedPassword = await bcrypt.hash(patientData.password, saltRounds);

  // Crear nuevo paciente
  const newPatient = await prisma.user.create({
    data: {
      ...patientData,
      password: hashedPassword,
      role: 'Paciente',
    }
  });

  // Asociar al instructor
  try {
    await prisma.instructorPatient.create({
      data: {
        instructorId: parseInt(instructorId, 10),
        patientId: newPatient.id
      }
    });
  } catch (error) {
    console.error("Error al crear relación Instructor-Patient:", error);
    return { success: false, message: "Error al relacionar instructor con paciente" };
  }

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

  const sanitizedData = {
    ...updateData,
    age: updateData.age ? Number(updateData.age) : null,
  };

  const updated = await prisma.user.update({
    where: { id: parseInt(id) },
    data: sanitizedData
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
      painBefore: { select: { name: true } },
      painAfter: { select: { name: true } },
    },
    orderBy: {
      startedAt: 'desc',
    },
  });

  return sesiones;
};
