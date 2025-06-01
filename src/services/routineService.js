import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getRoutineByPatientId = async (patientId) => {
  try {
    const patientSeries = await prisma.patientSeries.findFirst({
      where: {
        patientId: Number(patientId),
        isActive: true
      },
      include: {
        series: {
          include: {
            therapy: true,
            postures: {
              include: {
                posture: true
              },
              orderBy: { order: 'asc' }
            }
          }
        }
      }
    });

    if (!patientSeries) {
      return { success: false, message: "El paciente no tiene una serie activa" };
    }

    const { series } = patientSeries;
    const { therapy, postures: seriesPostures } = series;

    const postures = seriesPostures.map(sp => {
      const p = sp.posture;
      return {
        postureId: p.id,
        nameEs: p.nameEs,
        nameSans: p.nameSans,
        image: p.image,
        video: p.video,
        instructions: p.instructions,
        benefits: p.benefits,
        modifications: p.modifications,
        warnings: p.warnings,
        durationMinutes: sp.durationMinutes,
        order: sp.order
      };
    });

    return {
      success: true,
      seriesId: series.id,
      name: series.name,
      therapy: therapy.name,
      recommendedSessions: series.recommendedSessions,
      sessionsCompleted: patientSeries.sessionsCompleted,
      postures
    };
    
  } catch (error) {
    console.error('Error al obtener la rutina del paciente:', error);
    return { success: false, message: 'Error del servidor' };
  }
};
