export default {
    users: [
        {
            id: 1,
            firstName: "Jhon Carlos",
            lastName: "Perez Lopez",
            identification: "1234567890123",
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
        },
        {
            id: 3,
            firstName: "Ana María",
            lastName: "López Ruiz",
            identification: "3333333333",
            phone: "0999999999",
            role: "Paciente",
            email: "ana@vitalshanti.com",
            password: "demo123"
        },
        {
            id: 4,
            firstName: "Paciente",
            lastName: "SinSeries",
            identification: "8888888888",
            phone: "0998888888",
            role: "Paciente",
            email: "paciente.sinseries@vitalshanti.com",
            password: "demo123"
        },
        {
            id: 5,
            firstName: "Paciente",
            lastName: "ConSerieSinSesiones",
            identification: "9999999999",
            phone: "0999999999",
            role: "Paciente",
            email: "paciente.sin.sesiones@vitalshanti.com",
            password: "demo123"
        },
        {
            id: 900,
            firstName: "Usuario",
            lastName: "Login Test",
            email: "login@test.com",
            password: "$2b$10$/Pkc2LB1eb9fIO0j/PQdLu6cr8t93e7sBudhD9b.T82RQHo/1o6F.",
            role: "Instructor"
        }


    ],

    instructorPatients: [
        {
            id: 1,
            instructorId: 1,
            patientId: 2
        },
        {
            id: 2,
            instructorId: 1,
            patientId: 3
        }
        // NOTA: no agregamos vínculo con patientId 4 (sin series)
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
        },
        {
            id: 2,
            patientId: 3,
            seriesId: 1,
            isActive: false,
            assignedAt: "2025-05-22T10:00:00Z",
            sessionsCompleted: 0
        }
        ,
        {
            id: 3,
            patientId: 5,
            seriesId: 1,
            isActive: true,
            assignedAt: "2025-06-20T10:00:00Z",
            sessionsCompleted: 0
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
            startedAt: new Date("2025-05-21T14:00:00Z"),
            endedAt: new Date("2025-05-21T14:25:00Z"),
            painBeforeId: 3,
            painAfterId: 2,
            pauses: 1,
            effectiveMinutes: 20,
            comment: "Me sentí mejor al final de la sesión"
        },
        {
            id: 2,
            patientSeriesId: 1,
            startedAt: new Date("2025-05-22T13:30:00Z"),
            endedAt: new Date("2025-05-22T14:00:00Z"),
            painBeforeId: 2,
            painAfterId: 1,
            pauses: 0,
            effectiveMinutes: 25,
            comment: "Excelente, sin molestias"
        }
    ]
};
