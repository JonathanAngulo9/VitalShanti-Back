import { PrismaClient } from '@prisma/client';
const prismaDefault = new PrismaClient(); // En test se usa el mock de Prisma

/**
 * Crea un nuevo paciente y lo vincula a un instructor
 */
export const createPatient = async (patientData, instructorId, prisma=prismaDefault) => {
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

  // ** verificar existenciaa instructor :D agregué un test sobre esto, no tan necesario.
  // borrar o descomentar en este y test, si se va o deja**

  //const instructorExists = await prisma.user.findUnique({
  //  where: { id: instructorId, role: 'Instructor' }
  //});
  //if (!instructorExists) {
  //  return { success: false, message: "El instructor no existe" };
  //}

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
export const getPatientsByInstructorId = async (instructorId, prisma = prismaDefault) => {
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
export const updatePatient = async (id, updateData, prisma = prismaDefault) => {
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

export const fetchSesionesByPaciente = async (idPaciente, prisma = prismaDefault) => {
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
