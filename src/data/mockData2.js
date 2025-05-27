export default {
  users: [
    {
      id: 1,
      firstName: "Jhon Carlos",
      lastName: "Perez Lopez",
      identification: "1234567890123", // RUC o cédula
      phone: "0987654321",
      role: "Instructor",
      email: "carlos@vitalshanti.com",
      password: "demo123"
    },
    {
      id: 2,
      firstName: "Denis Andres",
      lastName: "Torres Lopez",
      identification: "1234567890",
      phone: "0987654321",
      role: "Paciente",
      email: "andres@vitalshanti.com",
      password: "demo123"
    }
  ],

  instructorPatients: [
    {
      id: 1,
      instructorId: 1,
      patientId: 2
    }
  ],

  therapies: [
    { id: 1, name: "Ansiedad" },
    { id: 2, name: "Dolor de espalda" },
    { id: 3, name: "Mala postura" }
  ],

  postures: [
    {
      id: 1,
      nameEs: "Torsión de Bharadvaja I",
      nameSans: "Bharadvājāsana I",
      instructions: "Siéntate en el suelo con las piernas hacia un lado...",
      benefits: "Mejora la movilidad espinal...",
      modifications: "Si hay rigidez en caderas...",
      warnings: "Evita forzar la torsión si hay dolor agudo...",
      image: "https://cdn.doyou.com/wp/2017/07/bharadvajasana-I.jpg",
      video: "https://www.youtube.com/embed/TxvEAKUa4Z8?start=11"
    },
    {
      id: 2,
      nameEs: "Torsión de Bharadvaja II",
      nameSans: "Bharadvājāsana II",
      instructions: "Siéntate en el suelo, dobla una pierna hacia atrás...",
      benefits: "Estira y fortalece la columna vertebral...",
      modifications: "Usa una manta bajo las caderas...",
      warnings: "Evita forzar la torsión si hay dolor agudo...",
      image: "https://cdn.doyou.com/wp/2017/07/bharadvajasana-II.jpg",
      video: "https://www.youtube.com/embed/gU0Ky8pUBGM"
    }
  ],

  therapyPostures: [
    { therapyId: 1, postureId: 1 },
    { therapyId: 1, postureId: 2 },
    { therapyId: 2, postureId: 2 },
    { therapyId: 3, postureId: 1 },
    { therapyId: 3, postureId: 2 }
  ],

  series: [
    {
      id: 1,
      instructorId: 1,
      name: "Serie para Ansiedad Crónica",
      therapyId: 1,
      recommendedSessions: 5
    }
  ],

  seriesPostures: [
    {
      seriesId: 1,
      postureId: 1,
      durationMinutes: 4,
      order: 1
    },
    {
      seriesId: 1,
      postureId: 2,
      durationMinutes: 3,
      order: 2
    }
  ],

  patientSeries: [
    {
      id: 1,
      patientId: 2,
      seriesId: 1,
      isActive: true,
      assignedAt: "2025-05-22T10:00:00Z",
      sessionsCompleted: 2
    }
  ],

  painLevels: [
    { id: 1, name: "sin dolor/molestia" },
    { id: 2, name: "leve" },
    { id: 3, name: "moderado" },
    { id: 4, name: "intenso" },
    { id: 5, name: "máximo dolor/molestia" }
  ],

  sessions: [
    {
      id: 1,
      patientSeriesId: 1,
      startedAt: "2025-05-21T14:00:00Z",
      endedAt: "2025-05-21T14:25:00Z",
      painBeforeId: 3,
      painAfterId: 2,
      pauses: 1,
      effectiveMinutes: 20,
      comment: "Me sentí mejor al final de la sesión"
    },
    {
      id: 2,
      patientSeriesId: 1,
      startedAt: "2025-05-22T13:30:00Z",
      endedAt: "2025-05-22T14:00:00Z",
      painBeforeId: 2,
      painAfterId: 1,
      pauses: 0,
      effectiveMinutes: 25,
      comment: "Excelente, sin molestias"
    },
    {
      id: 3,
      patientSeriesId: 1,
      startedAt: "2025-05-23T15:00:00Z",
      endedAt: "2025-05-23T15:20:00Z",
      painBeforeId: 2,
      painAfterId: 1,
      pauses: 2,
      effectiveMinutes: 15,
      comment: "Noté algo de rigidez al inicio"
    },
    {
      id: 4,
      patientSeriesId: 1,
      startedAt: "2025-05-24T14:15:00Z",
      endedAt: "2025-05-24T14:45:00Z",
      painBeforeId: 1,
      painAfterId: 0,
      pauses: 0,
      effectiveMinutes: 28,
      comment: "Sin dolor, sesión muy buena"
    },
    {
      id: 5,
      patientSeriesId: 1,
      startedAt: "2025-05-25T13:45:00Z",
      endedAt: "2025-05-25T14:10:00Z",
      painBeforeId: 3,
      painAfterId: 2,
      pauses: 1,
      effectiveMinutes: 20,
      comment: "El dolor disminuyó pero aún presente"
    }
  ]
};
