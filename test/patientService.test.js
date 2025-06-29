import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createPatient,getPatientsByInstructorId, updatePatient, fetchSesionesByPaciente } from '../src/services/patientService.js';
import mockData from '../src/data/dataTestUnified.js';

describe('Tests de createPatient', () => {
    let prismaMock;

    beforeEach(() => {

        const db = JSON.parse(JSON.stringify(mockData));

        prismaMock = {
            user: {
                findUnique: vi.fn((args) => {
                    if (args.where.email) {
                        return (
                            db.users.find(u => u.email === args.where.email) || null
                        );
                    }

                    if (args.where.id && args.where.role === 'Instructor') {
                        return (
                            db.users.find(
                                u =>
                                    u.id === args.where.id &&
                                    u.role === 'Instructor'
                            ) || null
                        );
                    }

                    return null;
                }),
                findFirst: vi.fn((args) => {
                    return (
                        db.users.find(
                            u =>
                                u.id === parseInt(args.where.id) &&
                                u.role === args.where.role
                        ) || null
                    );
                }),

                update: vi.fn((args) => {
                    const index = db.users.findIndex(u => u.id === args.where.id);
                    if (index === -1) return null;

                    db.users[index] = {
                        ...db.users[index],
                        ...args.data
                    };

                    return db.users[index];
                }),

                create: vi.fn((args) => {
                    const newId = db.users.length + 1;
                    const newUser = {
                        id: newId,
                        ...args.data
                    };
                    db.users.push(newUser);
                    return newUser;
                }),
            },

            instructorPatient: {
                create: vi.fn((args) => {
                    const newLink = {
                        id: db.instructorPatients.length + 1,
                        instructorId: args.data.instructorId,
                        patientId: args.data.patientId
                    };
                    db.instructorPatients.push(newLink);
                    return newLink;
                }),

                findMany: vi.fn((args) => {
                    const patientsLinks = db.instructorPatients.filter(
                        ip => ip.instructorId === parseInt(args.where.instructorId)
                    );

                    return patientsLinks.map(link => {
                        const patient = db.users.find(u => u.id === link.patientId);
                        return {
                            ...link,
                            patient
                        };
                    });
                })
            },
            session: {
                findMany: vi.fn((args) => {
                    const patientId = args.where.patientSeries.patientId;

                    // Filtra sesiones que correspondan a patientSeries con el paciente
                    const sessions = db.sessions.filter((s) => {
                        const patientSeries = db.patientSeries.find(
                            ps => ps.id === s.patientSeriesId
                        );
                        return patientSeries?.patientId === patientId;
                    });


                    return sessions.map((s) => {
                        const painBefore = db.painLevels.find(p => p.id === s.painBeforeId);
                        const painAfter = db.painLevels.find(p => p.id === s.painAfterId);
                        return {
                            id: s.id,
                            startedAt: s.startedAt,
                            endedAt: s.endedAt,
                            pauses: s.pauses,
                            effectiveMinutes: s.effectiveMinutes,
                            comment: s.comment,
                            painBefore: { name: painBefore?.name || null },
                            painAfter: { name: painAfter?.name || null },
                        };
                    }).sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt));
                })
            }
        };
    });


    it('Dado un correo ya registrado, Cuando se intenta crear un paciente, Entonces devuelve mensaje de error', async () => {
        const instructorId = 1;
        const patientData = {
            firstName: "Ana",
            lastName: "López",
            email: "ana@vitalshanti.com", // existe en mockData
            password: "demo123",
            phone: "0999999999",
            identification: "3333333333"
        };

        const result = await createPatient(patientData, instructorId, prismaMock);

        expect(result).toEqual({
            success: false,
            message: "El correo ya está registrado"
        });
    });

    //usar si se pone validación de intructor

    //it('Dado un instructor inexistente, Cuando se intenta crear el paciente, Entonces devuelve mensaje de error', async () => {
    //    const instructorId = 9999; // No existe en mockData
    //    const patientData = {
    //        firstName: "Pedro",
    //        lastName: "Gomez",
    //        email: "pedro.nuevo@vitalshanti.com",
    //        password: "demo123",
    //        phone: "0999999999",
    //        identification: "7777777777"
    //    };
//
    //    const result = await createPatient(patientData, instructorId, prismaMock);
//
    //    expect(result).toEqual({
    //        success: false,
    //        message: "El instructor no existe"
    //    });
    //});

    it('Dado un correo no registrado y un instructor existente, Cuando se crea el paciente, Entonces se crea el usuario y se vincula al instructor', async () => {
        const instructorId = 1;
        const patientData = {
            firstName: "Pedro",
            lastName: "Gomez",
            email: "pedro.nuevo@vitalshanti.com",
            password: "demo123",
            phone: "0999999999",
            identification: "7777777777"
        };

        const result = await createPatient(patientData, instructorId, prismaMock);

        expect(result.success).toBe(true);
        expect(result.patient).toBeDefined();
        expect(result.patient.email).toBe(patientData.email);

        expect(prismaMock.instructorPatient.create).toHaveBeenCalledWith({
            data: {
                instructorId,
                patientId: result.patient.id
            }
        });
    });


    it('Dado un instructor existente, Cuando obtiene sus pacientes, Entonces devuelve el listado de pacientes', async () => {
        const instructorId = 1;

        const patients = await getPatientsByInstructorId(instructorId, prismaMock);

        expect(patients).toBeInstanceOf(Array);
        expect(patients.length).toBeGreaterThan(0);

        for (const p of patients) {
            expect(p.role).toBe("Paciente");
        }
    });

    it('Dado un instructor sin pacientes, Cuando obtiene sus pacientes, Entonces devuelve un array vacío', async () => {
        const instructorId = 9999;

        const patients = await getPatientsByInstructorId(instructorId, prismaMock);

        expect(patients).toEqual([]);
    });


    it('Dado un ID inexistente, Cuando se actualiza, Entonces devuelve error de paciente no encontrado', async () => {
        const id = 9999;
        const updateData = { phone: "0999999999" };

        const result = await updatePatient(id, updateData, prismaMock);

        expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
            where: { id: parseInt(id), role: 'Paciente' }
        });

        expect(result).toEqual({
            success: false,
            message: "Paciente no encontrado"
        });
    });

    it('Dado un paciente existente, Cuando se actualiza, Entonces devuelve el paciente actualizado', async () => {
        const id = 2; // user existente y a "modificar"
        const updateData = {
            phone: "0123456789",
            firstName: "Denis Modificado"
        };

        const result = await updatePatient(id, updateData, prismaMock);

        expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
            where: { id: parseInt(id), role: 'Paciente' }
        });

        expect(prismaMock.user.update).toHaveBeenCalledWith({
            where: { id: parseInt(id) },
            data: updateData
        });

        expect(result.success).toBe(true);
        expect(result.patient.id).toBe(id);
        expect(result.patient.phone).toBe("0123456789");
        expect(result.patient.firstName).toBe("Denis Modificado");
    });

    it('Dado un paciente existente con sesiones, Cuando se consulta, Entonces devuelve las sesiones ordenadas', async () => {
        const patientId = 2; // Denis Andres en tu mockData tiene sesiones

        const result = await fetchSesionesByPaciente(patientId, prismaMock);

        expect(prismaMock.session.findMany).toHaveBeenCalledWith({
            where: {
                patientSeries: {
                    patientId: parseInt(patientId),
                },
            },
            select: expect.any(Object),
            orderBy: {
                startedAt: 'desc',
            },
        });

        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBeGreaterThan(0);

        for (const sesion of result) {
            expect(sesion).toHaveProperty('id');
            expect(sesion).toHaveProperty('startedAt');
            expect(sesion).toHaveProperty('endedAt');
            expect(sesion).toHaveProperty('pauses');
            expect(sesion).toHaveProperty('effectiveMinutes');
            expect(sesion).toHaveProperty('comment');
            expect(sesion.painBefore).toHaveProperty('name');
            expect(sesion.painAfter).toHaveProperty('name');
        }
    });

    it('Dado un paciente sin sesiones, Cuando se consulta, Entonces devuelve un array vacío', async () => {
        const patientId = 9999; // no existe sesiones q

        const result = await fetchSesionesByPaciente(patientId, prismaMock);

        expect(result).toEqual([]);
    });
});

