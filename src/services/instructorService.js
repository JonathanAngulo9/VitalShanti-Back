import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Crea una rutina (serie) para un paciente, validando que sea del instructor correspondiente
 */
export const crearRutina = async ({ pacienteId, nombre, tipoTerapiaId, sesionesRecom, posturas }, instructorId) => {
  if (!pacienteId || !nombre || !tipoTerapiaId || !posturas || posturas.length < 0) {
    throw new Error('Faltan datos o menos de 6 posturas');
  }

  // Verificar si el paciente pertenece al instructor
  const vinculo = await prisma.instructorPatient.findFirst({
    where: {
      instructorId: instructorId,
      patientId: pacienteId,
    }
  });

  if (!vinculo) {
    throw new Error('No autorizado para crear rutina para este paciente');
  }

  // Crear la serie
  const nuevaSerie = await prisma.series.create({
    data: {
      name: nombre,
      therapyId: tipoTerapiaId,
      instructorId: instructorId,
      recommendedSessions: sesionesRecom,
      postures: {
        create: posturas.map((p, i) => ({
          postureId: p.posturaId,
          order: p.orden ?? i + 1,
          durationMinutes: p.duracion,
        })),
      },
    },
    include: {
      postures: true
    }
  });

  // Upsert de asignación paciente-serie
  const asignacion = await prisma.patientSeries.upsert({
    where: {
      patientId_seriesId: {
        patientId: pacienteId,
        seriesId: nuevaSerie.id
      }
    },
    update: {
      isActive: true,
      sessionsCompleted: 0,
      assignedAt: new Date(),
    },
    create: {
      patientId: pacienteId,
      seriesId: nuevaSerie.id,
      isActive: true,
      sessionsCompleted: 0,
      assignedAt: new Date(),
    }
  });

  return nuevaSerie;
};

/**
 * Devuelve todas las posturas
 */
export const obtenerPosturas = async () => {
  return await prisma.posture.findMany();
};

export const obtenerTerapias = async () => {
  return await prisma.therapy.findMany();
};