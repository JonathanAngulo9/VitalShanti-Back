import { describe, it, expect, beforeEach } from 'vitest';
import { crearRutina, obtenerPosturas, obtenerTerapias } from '../src/services/instructorService.js';
import mockData from '../src/data/dataTestUnified.js';

describe('Tests de lógica Prisma con Vitest', () => {
    let prismaMock;

    beforeEach(() => {
        
        const db = JSON.parse(JSON.stringify(mockData));

        prismaMock = {
            instructorPatient: {
                findFirst: async (args) => {
                    return db.instructorPatients.find(
                        ip =>
                            ip.instructorId === args.where.instructorId &&
                            ip.patientId === args.where.patientId
                    ) || null;
                },
            },

            patientSeries: {
                findFirst: async (args) => {
                    return db.patientSeries.find(
                        ps =>
                            ps.patientId === args.where.patientId &&
                            ps.isActive === args.where.isActive
                    ) || null;
                },
                upsert: async (args) => {
                    const existing = db.patientSeries.find(
                        ps =>
                            ps.patientId === args.where.patientId_seriesId?.patientId &&
                            ps.seriesId === args.where.patientId_seriesId?.seriesId
                    );
                    if (existing) {
                        Object.assign(existing, args.update);
                        return existing;
                    } else {
                        const newId = db.patientSeries.length + 1;
                        const newAssign = {
                            ...args.create,
                            id: newId,
                        };
                        db.patientSeries.push(newAssign);
                        return newAssign;
                    }
                },
            },

            series: {
                create: async (args) => {
                    const newId = db.series.length + 1;

                    const newSeries = {
                        id: newId,
                        instructorId: args.data.instructorId,
                        name: args.data.name,
                        therapyId: args.data.therapyId,
                        recommendedSessions: args.data.recommendedSessions,
                        postures: args.data.postures.create.map((p, i) => ({
                            postureId: p.postureId,
                            order: p.order ?? i + 1,
                            durationMinutes: p.durationMinutes,
                        })),
                    };

                    db.series.push(newSeries);

                    return {
                        ...newSeries,
                        postures: newSeries.postures,
                    };
                },
            },

            posture: {
                findMany: async () => db.postures,
            },

            therapy: {
                findMany: async () => db.therapies,
            },
        };
    });

    it.each([
        [
            { nombre: 'Serie X', tipoTerapiaId: 1, sesionesRecom: 4, posturas: [{ posturaId: 1, duracion: 5 }] },
            'pacienteId'
        ],
        [
            { pacienteId: 2, tipoTerapiaId: 1, sesionesRecom: 4, posturas: [{ posturaId: 1, duracion: 5 }] },
            'nombre'
        ],
        [
            { pacienteId: 2, nombre: 'Serie X', sesionesRecom: 4, posturas: [{ posturaId: 1, duracion: 5 }] },
            'tipoTerapiaId'
        ],
        [
            { pacienteId: 2, nombre: 'Serie X', tipoTerapiaId: 1, sesionesRecom: 4 },
            'posturas'
        ],
    ])(
        'Dado una petición para crear rutina, Cuando falta el campo obligatorio "%s", Entonces lanza un error indicando que faltan datos',
        async (partialData, missingField) => {
            const instructorId = 1;

            await expect(
                crearRutina(partialData, instructorId, prismaMock)
            ).rejects.toThrow('Faltan datos');
        }
    );

    it(
        'Dado una petición para crear rutina, Cuando el paciente no pertenece al instructor, Entonces lanza un error indicando que no está autorizado',
        async () => {
            const rutinaData = {
                pacienteId: 9999,
                nombre: 'Serie Nueva',
                tipoTerapiaId: 1,
                sesionesRecom: 3,
                posturas: [
                    { posturaId: 1, duracion: 5 },
                ],
            };

            const instructorId = 1;

            await expect(
                crearRutina(rutinaData, instructorId, prismaMock)
            ).rejects.toThrow('No autorizado para crear rutina para este paciente');
        }
    );

    it(
        'Dado una petición para crear rutina, Cuando el paciente ya tiene una serie activa, Entonces lanza un error indicando que ya existe una serie activa',
        async () => {
            const rutinaData = {
                pacienteId: 2,
                nombre: 'Otra Serie',
                tipoTerapiaId: 1,
                sesionesRecom: 3,
                posturas: [
                    { posturaId: 1, duracion: 5 },
                ],
            };

            const instructorId = 1;

            await expect(
                crearRutina(rutinaData, instructorId, prismaMock)
            ).rejects.toThrow('El paciente ya cuenta con una serie activa actualmente');
        }
    );

    it(
        'Dado una petición para crear rutina, Cuando el paciente pertenece al instructor y no tiene serie activa, Entonces crea la rutina correctamente',
        async () => {
            const rutinaData = {
                pacienteId: 3,
                nombre: 'Serie para Flexibilidad',
                tipoTerapiaId: 1,
                sesionesRecom: 6,
                posturas: [
                    { posturaId: 1, duracion: 5 },
                    { posturaId: 2, duracion: 7 },
                ],
            };

            const instructorId = 1;

            const result = await crearRutina(rutinaData, instructorId, prismaMock);

            expect(result).toBeDefined();
            expect(result.name).toBe('Serie para Flexibilidad');
            expect(result.instructorId).toBe(instructorId);
            expect(result.therapyId).toBe(1);
            expect(result.recommendedSessions).toBe(6);

            expect(result.postures[0]).toMatchObject({
                postureId: 1,
                durationMinutes: 5,
                order: 1
            });
            expect(result.postures[1]).toMatchObject({
                postureId: 2,
                durationMinutes: 7,
                order: 2
            });
        }
    );

    it('Dado una petición para obtener posturas, Cuando se invoca el servicio, Entonces devuelve todas las posturas', async () => {
        const posturas = await obtenerPosturas(prismaMock);
        expect(posturas).toBeInstanceOf(Array);
        expect(posturas.length).toBeGreaterThan(0);
    });

    it('Dado una petición para obtener terapias, Cuando se invoca el servicio, Entonces devuelve todas las terapias', async () => {
        const terapias = await obtenerTerapias(prismaMock);
        expect(terapias).toBeInstanceOf(Array);
        expect(terapias.length).toBeGreaterThan(0);
    });

    it('Dado una petición para obtener posturas, Cuando no hay posturas en la base, Entonces devuelve un array vacío', async () => {
        prismaMock.posture.findMany = async () => [];
        const posturas = await obtenerPosturas(prismaMock);
        expect(posturas).toEqual([]);
    });

    it('Dado una petición para obtener terapias, Cuando no hay terapias en la base, Entonces devuelve un array vacío', async () => {
        prismaMock.therapy.findMany = async () => [];
        const terapias = await obtenerTerapias(prismaMock);
        expect(terapias).toEqual([]);
    });
});
