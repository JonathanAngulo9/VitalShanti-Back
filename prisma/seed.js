import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const saltRounds = 10;

async function main() {
    console.log('⏳ Sembrando datos iniciales...');

    // 1. Crear usuarios
    const passwordHash = await bcrypt.hash("demo123", saltRounds);

    const instructor = await prisma.user.create({
        data: {
            firstName: "Jhon Carlos",
            lastName: "Perez Lopez",
            identification: "1234567890123",
            phone: "0987654321",
            role: "Instructor",
            email: "carlos@vitalshanti.com",
            password: passwordHash
        }
    });

    const paciente = await prisma.user.create({
        data: {
            firstName: "Denis Andres",
            lastName: "Torres Lopez",
            identification: "1234567890",
            phone: "0987654321",
            role: "Paciente",
            email: "andres@vitalshanti.com",
            password: passwordHash,
            age: 28,
            gender: "Masculino",
            medicalConditions: "Hipertensión y problemas de espalda"
        }
    });

    // 2. Relación instructor-paciente
    await prisma.instructorPatient.create({
        data: {
            instructorId: instructor.id,
            patientId: paciente.id
        }
    });

    // 3. Terapias
    const [ansiedad, espalda, postura] = await prisma.$transaction([
        prisma.therapy.create({ data: { name: "Ansiedad" } }),
        prisma.therapy.create({ data: { name: "Dolor de espalda" } }),
        prisma.therapy.create({ data: { name: "Mala postura" } }),
    ]);

    // 4. Posturas
    const [postura1, postura2] = await prisma.$transaction([
        prisma.posture.create({
            data: {
                nameEs: "Torsión de Bharadvaja I",
                nameSans: "Bharadvājāsana I",
                instructions: "Siéntate en el suelo con las piernas hacia un lado...",
                benefits: "Mejora la movilidad espinal...",
                modifications: "Si hay rigidez en caderas...",
                warnings: "Evita forzar la torsión si hay dolor agudo...",
                image: "https://cdn.doyou.com/wp/2017/07/bharadvajasana-I.jpg",
                video: "https://www.youtube.com/embed/TxvEAKUa4Z8?start=11"
            }
        }),
        prisma.posture.create({
            data: {
                nameEs: "Torsión de Bharadvaja II",
                nameSans: "Bharadvājāsana II",
                instructions: "Siéntate en el suelo, dobla una pierna hacia atrás...",
                benefits: "Estira y fortalece la columna vertebral...",
                modifications: "Usa una manta bajo las caderas...",
                warnings: "Evita forzar la torsión si hay dolor agudo...",
                image: "https://cdn.doyou.com/wp/2017/07/bharadvajasana-II.jpg",
                video: "https://www.youtube.com/embed/gU0Ky8pUBGM"
            }
        })
    ]);

    // 5. TherapyPostures
    await prisma.therapyPosture.createMany({
        data: [
            { therapyId: ansiedad.id, postureId: postura1.id },
            { therapyId: ansiedad.id, postureId: postura2.id },
            { therapyId: espalda.id, postureId: postura2.id },
            { therapyId: postura.id, postureId: postura1.id },
            { therapyId: postura.id, postureId: postura2.id }
        ]
    });

    // 6. Serie
    const serie = await prisma.series.create({
        data: {
            name: "Serie para Ansiedad Crónica",
            instructorId: instructor.id,
            therapyId: ansiedad.id,
            recommendedSessions: 5
        }
    });

    // 7. SeriesPostures
    await prisma.seriesPosture.createMany({
        data: [
            { seriesId: serie.id, postureId: postura1.id, durationMinutes: 4, order: 1 },
            { seriesId: serie.id, postureId: postura2.id, durationMinutes: 3, order: 2 }
        ]
    });

    // 8. PatientSeries
    const patientSeries = await prisma.patientSeries.create({
        data: {
            patientId: paciente.id,
            seriesId: serie.id,
            isActive: true,
            assignedAt: new Date("2025-05-22T10:00:00Z"),
            sessionsCompleted: 2
        }
    });

    // 9. PainLevels
    const [sinDolor, leve, moderado, intenso, maximo] = await prisma.$transaction([
        prisma.painLevel.create({ data: { name: "sin dolor/molestia" } }),
        prisma.painLevel.create({ data: { name: "leve" } }),
        prisma.painLevel.create({ data: { name: "moderado" } }),
        prisma.painLevel.create({ data: { name: "intenso" } }),
        prisma.painLevel.create({ data: { name: "máximo dolor/molestia" } }),
    ]);

    // 10. Sessions
    await prisma.session.createMany({
        data: [
            {
                patientSeriesId: patientSeries.id,
                startedAt: new Date("2025-05-21T14:00:00Z"),
                endedAt: new Date("2025-05-21T14:25:00Z"),
                painBeforeId: moderado.id,
                painAfterId: leve.id,
                pauses: 1,
                effectiveMinutes: 20,
                comment: "Me sentí mejor al final de la sesión"
            },
            {
                patientSeriesId: patientSeries.id,
                startedAt: new Date("2025-05-22T13:30:00Z"),
                endedAt: new Date("2025-05-22T14:00:00Z"),
                painBeforeId: leve.id,
                painAfterId: sinDolor.id,
                pauses: 0,
                effectiveMinutes: 25,
                comment: "Excelente, sin molestias"
            },
            {
                patientSeriesId: patientSeries.id,
                startedAt: new Date("2025-05-23T15:00:00Z"),
                endedAt: new Date("2025-05-23T15:20:00Z"),
                painBeforeId: leve.id,
                painAfterId: sinDolor.id,
                pauses: 2,
                effectiveMinutes: 15,
                comment: "Noté algo de rigidez al inicio"
            },
            {
                patientSeriesId: patientSeries.id,
                startedAt: new Date("2025-05-24T14:15:00Z"),
                endedAt: new Date("2025-05-24T14:45:00Z"),
                painBeforeId: sinDolor.id,
                painAfterId: sinDolor.id,
                pauses: 0,
                effectiveMinutes: 28,
                comment: "Sin dolor, sesión muy buena"
            },
            {
                patientSeriesId: patientSeries.id,
                startedAt: new Date("2025-05-25T13:45:00Z"),
                endedAt: new Date("2025-05-25T14:10:00Z"),
                painBeforeId: moderado.id,
                painAfterId: leve.id,
                pauses: 1,
                effectiveMinutes: 20,
                comment: "El dolor disminuyó pero aún presente"
            }
        ]
    });

    console.log('✅ Datos insertados correctamente.');
}

main()
    .catch((e) => {
        console.error('❌ Error durante seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
