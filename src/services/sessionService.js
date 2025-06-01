import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Obtiene el historial de niveles de dolor de un paciente
 */
export const getPainOverTime = async (idPatient) => {
  // Obtener las asignaciones activas del paciente
  const patientSeries = await prisma.patientSeries.findMany({
    where: { patientId: parseInt(idPatient) },
    select: { id: true }
  });

  if (patientSeries.length === 0) {
    return {
      success: false,
      message: "El paciente no tiene series asignadas"
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
      message: "El paciente no tiene sesiones registradas"
    };
  }

  const painData = sessions.map(session => ({
    fecha: session.startedAt.toISOString().split('T')[0],
    dolorInicial: session.painBeforeId,
    dolorInicialTexto: session.painBefore?.name ?? '',
    dolorFinal: session.painAfterId,
    dolorFinalTexto: session.painAfter?.name ?? ''
  }));

  return {
    success: true,
    data: painData
  };
};

//Crear una nueva sesion
export const createSession = async ({ patientSeriesId, painBeforeId, startedAt }) => {
  try {

    const newSession = await prisma.session.create({
      data: {
        painBefore: { connect: { id: Number(painBeforeId) } },
        painAfter: { connect: { id: 1 } }, // valor inicial quemado porque la BD no permite null
        patientSeries: { connect: { id: Number(patientSeriesId) } },
        startedAt: new Date(startedAt),
        endedAt: new Date("2025-12-31T23:59:59.000Z"),// valor inicial quemado porque la BD no permite null
        pauses: 0,
        effectiveMinutes: 25,
        comment: ""
      },
      include: {
        patientSeries: true
      }
    });


    return newSession;

  } catch (error) {
    console.error('Error al crear la sesión:', error);
    throw new Error("No se pudo crear la sesión: " + error.message);
  }
};

export const updateSession = async (id, { painAfterId, comment, endedAt, pauses, effectiveMinutes }) => {
  try {
    if (!painAfterId || !comment || !endedAt) {
      throw new Error("Faltan datos obligatorios");
    }

    // Verificar que exista el nivel de dolor
    const painLevel = await prisma.painLevel.findUnique({
      where: { id: Number(painAfterId) }
    });

    if (!painLevel) {
      throw new Error("Nivel de dolor no encontrado");
    }

    return await prisma.$transaction(async (tx) => {
      //Actualizar la sesión
      const updatedSession = await tx.session.update({
        where: { id: Number(id) },
        data: {
          painAfterId: Number(painAfterId),
          comment,
          endedAt: new Date(endedAt),
          pauses: 0,
          effectiveMinutes: 0
        },
        include: {
          patientSeries: true
        }
      });

      //Actualizar el contador en PatientSeries
      await tx.patientSeries.update({
        where: { id: updatedSession.patientSeriesId },
        data: {
          sessionsCompleted: { increment: 1 }
        }
      });

      //Obtener el nuevo valor
      const updatedPatientSeries = await tx.patientSeries.findUnique({
        where: { id: updatedSession.patientSeriesId }
      });

      return {
        updatedSession,
        sessionsCompleted: updatedPatientSeries.sessionsCompleted
      };
    });

  } catch (error) {
    console.error('Error al actualizar la sesión:', error);
    throw new Error("No se pudo actualizar la sesión: " + error.message);
  }
};