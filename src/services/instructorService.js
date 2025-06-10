import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Crea una rutina (serie) para un paciente, validando que sea del instructor correspondiente
 */
export const crearRutina = async ({ pacienteId, nombre, tipoTerapiaId, sesionesRecom, posturas }, instructorId) => {
  if (!pacienteId || !nombre || !tipoTerapiaId || !posturas ) {
    throw new Error('Faltan datos');
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

  // Verificar si el paciente ya tiene una serie activa
  const serieActiva = await prisma.patientSeries.findFirst({
    where: {
      patientId: pacienteId,
      isActive: true,
    }
  });

  if (serieActiva) {
    throw new Error('El paciente ya cuenta con una serie activa actualmente');
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