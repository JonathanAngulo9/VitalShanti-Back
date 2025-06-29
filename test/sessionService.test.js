import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getPainOverTime, updateSession } from '../src/services/sessionService.js';
import mockData from '../src/data/dataTestUnified.js';

describe('Tests a SessionService', () => {
    let prismaMock;

    beforeEach(() => {

        const db = JSON.parse(JSON.stringify(mockData));

        prismaMock = {
            user: {
                findUnique: vi.fn((args) => {
                    return db.users.find(u => u.id === args.where.id) || null;
                }),
            },

            patientSeries: {
                findMany: vi.fn((args) => {
                    return db.patientSeries.filter(ps => ps.patientId === args.where.patientId);
                }),
                findUnique: vi.fn((args) => {
                    return db.patientSeries.find(ps => ps.id === args.where.id) || null;
                }),
                update: vi.fn((args) => {
                    const ps = db.patientSeries.find(p => p.id === args.where.id);
                    if (ps) {
                        ps.sessionsCompleted += 1;
                        return ps;
                    }
                    return null;
                }),
            },

            session: {
                findMany: vi.fn((args) => {
                    const patientSeriesIds = args.where.patientSeriesId.in;

                    return db.sessions
                        .filter(s => patientSeriesIds.includes(s.patientSeriesId))
                        .sort((a, b) => new Date(a.startedAt) - new Date(b.startedAt))
                        .map(s => ({
                            ...s,
                            startedAt: new Date(s.startedAt),
                            endedAt: new Date(s.endedAt),
                            painBefore: db.painLevels.find(p => p.id === s.painBeforeId) || null,
                            painAfter: db.painLevels.find(p => p.id === s.painAfterId) || null
                        }));
                }),

                findUnique: vi.fn((args) => {
                    const s = db.sessions.find(s => s.id === args.where.id);
                    return s
                        ? {
                            ...s,
                            startedAt: new Date(s.startedAt),
                            endedAt: new Date(s.endedAt)
                        }
                        : null;
                }),

                update: vi.fn((args) => {
                    const index = db.sessions.findIndex(s => s.id === args.where.id);
                    if (index === -1) return null;

                    db.sessions[index] = {
                        ...db.sessions[index],
                        ...args.data
                    };

                    return db.sessions[index];
                }),
            },

            painLevel: {
                findUnique: vi.fn((args) => {
                    return db.painLevels.find(p => p.id === args.where.id) || null;
                }),
            },

            $transaction: vi.fn(async (cb) => {
                const tx = {
                    session: prismaMock.session,
                    patientSeries: prismaMock.patientSeries
                };
                return cb(tx);
            }),
        };
    });



    it('Dado un paciente inexistente, Cuando se consulta dolor en el tiempo, Entonces devuelve error', async () => {
        const patientId = 9999; //pacienet inexiste

        const result = await getPainOverTime(patientId, prismaMock);

        expect(result).toEqual({
            success: false,
            message: "Paciente no encontrado"
        });
    });

    it('Dado un paciente sin series, Cuando se consulta dolor en el tiempo, Entonces devuelve error', async () => {
        const patientId = 4; // paciente sin series

        const result = await getPainOverTime(patientId, prismaMock);

        expect(result.success).toBe(false);
        expect(result.message).toContain("El paciente no tiene series asignadas");
        expect(result.nombreCompleto).toBe("Paciente SinSeries");
    });

    it('Dado un paciente con series pero sin sesiones, Cuando se consulta dolor en el tiempo, Entonces devuelve error', async () => {
        const patientId = 5; // paciente con serie pero sin sesiones

        const result = await getPainOverTime(patientId, prismaMock);

        expect(result.success).toBe(false);
        expect(result.message).toContain("El paciente no tiene sesiones registradas");
        expect(result.nombreCompleto).toBe("Paciente ConSerieSinSesiones");
    });

    it('Dado un paciente con sesiones registradas, Cuando se consulta dolor en el tiempo, Entonces devuelve los datos correctamente', async () => {
        const patientId = 2; // Denis Andres sí tiene sesiones

        const result = await getPainOverTime(patientId, prismaMock);

        expect(result.success).toBe(true);
        expect(result.nombreCompleto).toContain("Denis");

        expect(result.data).toBeInstanceOf(Array);
        expect(result.data.length).toBeGreaterThan(0);

        for (const s of result.data) {
            expect(s).toHaveProperty('fecha');
            expect(s).toHaveProperty('dolorInicial');
            expect(s).toHaveProperty('dolorFinal');
            expect(s).toHaveProperty('dolorInicialTexto');
            expect(s).toHaveProperty('dolorFinalTexto');
        }
    });

    it.each([
        [{ painAfterId: null, comment: "ok", endedAt: "2025-10-01T11:00:00Z" }, "painAfterId"],
        [{ painAfterId: 1, comment: null, endedAt: "2025-10-01T11:00:00Z" }, "comment"],
        [{ painAfterId: 1, comment: "ok", endedAt: null }, "endedAt"],
    ])(
        'Dado datos incompletos (%s), Cuando se actualiza la sesión, Entonces lanza error por falta de "%s"',
        async (partialData, missingField) => {
            await expect(
                updateSession(1, partialData, prismaMock)
            ).rejects.toThrow("No se pudo actualizar la sesión: Faltan datos obligatorios");
        }
    );

    it('Dado un nivel de dolor inexistente, Cuando se actualiza la sesión, Entonces lanza error', async () => {
        await expect(
            updateSession(1, {
                painAfterId: 9999,
                comment: "Sin dolor",
                endedAt: "2025-10-01T11:00:00Z"
            }, prismaMock)
        ).rejects.toThrow("No se pudo actualizar la sesión: Nivel de dolor no encontrado");
    });

    it('Dado una sesión inexistente, Cuando se actualiza, Entonces lanza error', async () => {
        const result = updateSession(9999, {
            painAfterId: 1,
            comment: "Sin dolor",
            endedAt: "2025-10-01T11:00:00Z"
        }, prismaMock);

        await expect(result).rejects.toThrow("No se pudo actualizar la sesión: Sesión no encontrada");
    });

    it('Dado una sesión existente, Cuando se actualiza, Entonces devuelve sesión actualizada y contador incrementado', async () => {
        const id = 1;

        const input = {
            painAfterId: 2,
            comment: "Me siento mejor",
            endedAt: "2025-05-21T15:00:00Z", // 1h después de startedAt de la sesión id=1 en mockData
            pauses: 2
        };

        const result = await updateSession(id, input, prismaMock);

        expect(result).toHaveProperty('updatedSession');
        expect(result.updatedSession.id).toBe(id);
        expect(result.updatedSession.comment).toBe("Me siento mejor");
        expect(result.updatedSession.painAfterId).toBe(2);
        expect(result.updatedSession.effectiveMinutes).toBeGreaterThan(0);
        expect(result.sessionsCompleted).toBeGreaterThanOrEqual(3);
    });
});
