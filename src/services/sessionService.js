import { PrismaClient } from '@prisma/client';
const prismaDefault = new PrismaClient();

/**
 * Obtiene el historial de niveles de dolor de un paciente
 */
export const getPainOverTime = async (idPatient, prisma=prismaDefault) => {
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
//Crear una nueva sesion
export const createSession = async ({ patientSeriesId, painBeforeId, startedAt }, prisma=prismaDefault) => {
  try {
    // Verificar si existe el PatientSeries
    const patientSeriesExists = await prisma.patientSeries.findUnique({
      where: { id: Number(patientSeriesId) }
    });

    // Imprimir si se encuentra o no el PatientSeries
    console.log('Paciente con la serie encontrado:', patientSeriesExists);

    // Si no se encuentra, lanzar un error
    if (!patientSeriesExists) {
      throw new Error(`No se encontró la serie de paciente con el ID ${patientSeriesId}`);
    }

    // Crear la nueva sesión
    const newSession = await prisma.session.create({
      data: {
        painBefore: { connect: { id: Number(painBeforeId) } },
        painAfter: { connect: { id: 1 } }, // valor inicial quemado
        patientSeries: { connect: { id: Number(patientSeriesId) } },
        startedAt: new Date(startedAt),
        endedAt: new Date("2025-12-31T23:59:59.000Z"), // valor inicial quemado
        pauses: 0,
        effectiveMinutes: 0,
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

export const updateSession = async (id, { painAfterId, comment, endedAt, pauses }, prisma = prismaDefault) => {
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
      // Obtener la sesión actual para obtener startedAt
      const currentSession = await tx.session.findUnique({
        where: { id: Number(id) }
      });

      if (!currentSession) {
        throw new Error("Sesión no encontrada");
      }

      // Calcular la diferencia en minutos
      const startedAt = currentSession.startedAt;
      const endDate = new Date(endedAt);
      const diffInMilliseconds = endDate - startedAt;
      const effectiveMinutes = Math.floor(diffInMilliseconds / (1000 * 60));

      // Actualizar la sesión
      const updatedSession = await tx.session.update({
        where: { id: Number(id) },
        data: {
          painAfterId: Number(painAfterId),
          comment,
          endedAt: endDate,
          pauses: pauses || 0,
          effectiveMinutes
        },
        include: {
          patientSeries: true
        }
      });

      // Actualizar el contador en PatientSeries
      await tx.patientSeries.update({
        where: { id: updatedSession.patientSeriesId },
        data: {
          sessionsCompleted: { increment: 1 }
        }
      });

      // Obtener el nuevo valor
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