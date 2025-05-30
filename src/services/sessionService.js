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
