import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getRoutineByPatientId } from '../src/services/routineService.js';
import mockData from '../src/data/dataTestUnified.js';

describe('Tests de getRoutineByPatientId', () => {
    let prismaMock;

    beforeEach(() => {
        const db = JSON.parse(JSON.stringify(mockData));

        prismaMock = {
            patientSeries: {
                findFirst: vi.fn((args) => {
                    const patientSeries = db.patientSeries.find(
                        ps =>
                            ps.patientId === args.where.patientId &&
                            ps.isActive === args.where.isActive
                    );

                    if (!patientSeries) return null;

                    const series = db.series.find(s => s.id === patientSeries.seriesId);
                    const therapy = db.therapies.find(t => t.id === series.therapyId);

                    const posturesLinks = db.seriesPostures.filter(sp => sp.seriesId === series.id);
                    const postures = posturesLinks
                        .sort((a, b) => a.order - b.order)
                        .map(sp => {
                            const posture = db.postures.find(p => p.id === sp.postureId);
                            return {
                                ...sp,
                                posture
                            };
                        });

                    return {
                        ...patientSeries,
                        series: {
                            ...series,
                            therapy,
                            postures
                        }
                    };
                })
            }
        };
    });

    it('Dado un paciente con serie activa, Cuando se consulta, Entonces devuelve la rutina completa', async () => {
        const patientId = 2; // Denis Andres tiene una serie activa

        const result = await getRoutineByPatientId(patientId, prismaMock);

        expect(result.success).toBe(true);
        expect(result.name).toBeDefined();
        expect(result.seriesId).toBeDefined();
        expect(result.therapy).toBeDefined();
        expect(result.recommendedSessions).toBeGreaterThan(0);
        expect(result.postures).toBeInstanceOf(Array);

        for (const p of result.postures) {
            expect(p).toHaveProperty('postureId');
            expect(p).toHaveProperty('nameEs');
            expect(p).toHaveProperty('durationMinutes');
            expect(p).toHaveProperty('order');
        }
    });

    it('Dado un paciente sin serie activa, Cuando se consulta, Entonces devuelve mensaje de no encontrada', async () => {
        const patientId = 9999; // no existe en mockData

        const result = await getRoutineByPatientId(patientId, prismaMock);

        expect(result).toEqual({
            success: false,
            message: "El paciente no tiene una serie activa"
        });
    });

    it('Dado un error inesperado de Prisma, Cuando se consulta, Entonces devuelve error de servidor', async () => {
        prismaMock.patientSeries.findFirst = vi.fn(() => {
            throw new Error('DB error!');
        });

        const patientId = 2;

        const result = await getRoutineByPatientId(patientId, prismaMock);

        expect(result).toEqual({
            success: false,
            message: 'Error del servidor'
        });
    });
});
