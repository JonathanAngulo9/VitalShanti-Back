import { PrismaClient } from '@prisma/client';
const prismaDefault = new PrismaClient();

/**
 * Obtiene el historial de niveles de dolor de un paciente
 */
export const getPainOverTime = async (idPatient, prisma = prismaDefault) => {
  // Buscar el paciente
  const paciente = await prisma.user.findUnique({
    where: { id: parseInt(idPatient) },
    select: {
      firstName: true,
      lastName: true
    }
  });

  if (!paciente) {
    return {
      success: false,
      message: "Paciente no encontrado"
    };
  }

  const nombreCompleto = `${paciente.firstName} ${paciente.lastName}`;

  // Obtener las asignaciones activas del paciente
  const patientSeries = await prisma.patientSeries.findMany({
    where: { patientId: parseInt(idPatient) },
    select: { id: true }
  });

  if (patientSeries.length === 0) {
    return {
      success: false,
      message: "El paciente no tiene series asignadas",
      nombreCompleto
    };
  }

  const patientSeriesIds = patientSeries.map(ps => ps.id);

  // Obtener sesiones relacionadas
  const sessions = await prisma.session.findMany({
    where: {
      patientSeriesId: { in: patientSeriesIds }
    },
    include: {
      painBefore: true,
      painAfter: true
    },
    orderBy: {
      startedAt: 'asc'
    }
  });

  if (sessions.length === 0) {
    return {
      success: false,
      message: "El paciente no tiene sesiones registradas",
      nombreCompleto
    };
  }

  const painData = sessions.map(session => ({
    fecha: session.startedAt.toISOString().split('T')[0],
    dolorInicial: session.painBeforeId,
    dolorInicialTexto: session.painBefore?.name ?? '',
    dolorFinal: session.painAfterId,
    dolorFinalTexto: session.painAfter?.name ?? '',
    comentarioSession: session.comment
  }));

  return {
    success: true,
    nombreCompleto,
    data: painData
  };
};

export const createSession = async (
  { patientSeriesId, painBeforeId, startedAt, painAfterId, endedAt, comment, pauses, effectiveMinutes },
  prisma = prismaDefault
) => {
  try {
    const effectiveMinutesInSeconds = effectiveMinutes || 0;
    const effectiveMinutesInMinutes = Math.round(effectiveMinutesInSeconds / 60);

    const result = await prisma.$transaction(async (tx) => {
      const patientSeriesExists = await tx.patientSeries.findUnique({
        where: { id: Number(patientSeriesId) }
      });

      if (!patientSeriesExists) {
        throw new Error(`No se encontró la serie de paciente con el ID ${patientSeriesId}`);
      }

      // Crear la nueva sesión
      const newSession = await tx.session.create({
        data: {
          painBefore: { connect: { id: Number(painBeforeId) } },
          painAfter: { connect: { id: Number(painAfterId) } },
          patientSeries: { connect: { id: Number(patientSeriesId) } },
          startedAt: new Date(startedAt),
          endedAt: new Date(endedAt),
          pauses: pauses || 0,
          effectiveMinutes: effectiveMinutesInMinutes,
          comment
        },
        include: {
          patientSeries: true
        }
      });

      await tx.patientSeries.update({
        where: { id: Number(patientSeriesId) },
        data: {
          sessionsCompleted: { increment: 1 }
        }
      });

      const updatedPatientSeries = await tx.patientSeries.findUnique({
        where: { id: Number(patientSeriesId) }
      });

      return {
        newSession,
        sessionsCompleted: updatedPatientSeries.sessionsCompleted
      };
    });

    return result;

  } catch (error) {
    console.error('Error al crear la sesión:', error);
    throw new Error("No se pudo crear la sesión: " + error.message);
  }
};
