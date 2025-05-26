export default {
  instructores: [
        {
      id: 1,
      name: "Jhon Carlos",
      last_name: "Perez Lopez",
      ruc: "1234567890123",
      telefono: "0987654321",
      rol: "Instructor",
      email: "carlos@vitalshanti.com",
      password: "demo123"
    }
  ],
  pacientes: [
        {
      id: 1,
      name: "Denis Andres",
      last_name: "Torres Lopez",
      cedula: "1234567890",
      telefono: "0987654321",
      rol: "Paciente",
      email: "andres@vitalshanti.com",
      password: "demo123"
    }
  ],
  instructors_patients: [
    {
      id: 1,
      instructorId: 1,
      patientId: 1
    }
  ],
  therapy: [
    {
      id: 1,
      name: "Ansiedad"
    },
    {
      id: 2,
      name: "Dolor de espalda"
    },
    {
      id: 3,
      name: "Mala postura"
    }
  ],
  poses: [
    {
      id: 1,
      nameEs: "Torsión de Bharadvaja I",
      nameSans: "Bharadvājāsana I (भारद्वाजासन I)",
      instructions: "Siéntate en el suelo con las piernas hacia un lado. Inhala alargando la columna. Exhala y gira el torso hacia el lado contrario a las piernas. Coloca una mano en la rodilla opuesta y la otra detrás del sacro. Mantén la torsión suave y la mirada sobre el hombro.",
      benefits: "Mejora la movilidad espinal. Estimula los órganos digestivos. Ayuda a aliviar dolores de espalda.",
      modifications: "Si hay rigidez en caderas, siéntate sobre una manta o bloque. Mantén la torsión más suave si hay molestias.",
      warnings: "No existen modificaciones específicas, pero evita forzar la torsión si hay dolor agudo en la espalda o caderas.",
      image: "https://cdn.doyou.com/wp/2017/07/bharadvajasana-I.jpg",
      video: "https://www.youtube.com/embed/TxvEAKUa4Z8?start=11"
    },
    {
      id: 2,
      nameEs: "Torsión de Bharadvaja II",
      nameSans: "Bharadvājāsana II (भारद्वाजासन II)",
      instructions: "Siéntate en el suelo, dobla una pierna hacia atrás (como en virasana) y la otra en posición de padmasana (sobre el muslo contrario). Inhala alargando la columna. Exhala girando el torso hacia la pierna doblada hacia atrás. Coloca la mano externa sobre la rodilla de la pierna cruzada. Gira el cuello suavemente hacia el mismo lado que el torso.",
      benefits: "Estira y fortalece la columna vertebral. Mejora la digestión y masajea los órganos abdominales. Aumenta la movilidad del tronco.",
      modifications: "Si es difícil la posición de piernas, usa una versión simple como Bharadvajasana I. Usa una manta bajo las caderas para mayor estabilidad.",
      warnings: "No existen modificaciones específicas, pero evita forzar la torsión si hay dolor agudo en la espalda o caderas.",
      image: "https://cdn.doyou.com/wp/2017/07/bharadvajasana-II.jpg",
      video: "https://www.youtube.com/embed/gU0Ky8pUBGM"
    }
  ],
  therapy_poses: [
    {
      therapyId: 1,
      poseId: 1
    },
    {
      therapyId: 1,
      poseId: 2
    },
    {
      therapyId: 2,
      poseId: 2
    },
    {
      therapyId: 3,
      poseId: 1
    },
    {
      therapyId: 3,
      poseId: 2
    }
  ],
  routines: [
    {
      id: 1,
      instructorId: 1,
      name: "Rutina para Ansiedad Crónica",
      therapyId: 1,
      recommendedSessions: 5
    }
  ],
  routine_poses: [
    {
      routineId: 1,
      poseId: 1,
      durationMinutes: 4,
      order: 1
    },
    {
      routineId: 1,
      poseId: 2,
      durationMinutes: 3,
      order: 2
    }
  ],
  patient_routine: [
    {
      id: 1,
      patientId: 1,
      routineId: 1,
      isActive: true,
      assignedAt: "2025-05-22T10:00:00Z",
      sessionsCompleted: 2
    }
  ],
  session_logs: [
    {
      id: 1,
      patientRoutineId: 1,
      startedAt: "2025-05-21T14:00:00Z",
      endedAt: "2025-05-21T14:25:00Z",
      painBefore: "moderado",
      painAfter: "leve",
      pauses: 1,
      effectiveMinutes: 20,
      comment: "Me sentí mejor al final de la sesión"
    },
    {
      id: 2,
      patientRoutineId: 1,
      startedAt: "2025-05-22T13:30:00Z",
      endedAt: "2025-05-22T14:00:00Z",
      painBefore: "leve",
      painAfter: "sin dolor/molestia",
      pauses: 0,
      effectiveMinutes: 25,
      comment: "Excelente, sin molestias"
    }
  ]
};
