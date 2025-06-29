import { describe, it, expect, beforeEach, vi } from 'vitest';
import bcrypt from 'bcrypt';
import { registerUser, loginUser } from '../src/services/userService.js';
import mockData from '../src/data/dataTestUnified.js';

describe('Tests a userService', () => {
    let prismaMock;
    const plainPassword = "demo123";

    beforeEach(() => {
        const db = JSON.parse(JSON.stringify(mockData));

        prismaMock = {
            user: {
                findFirst: vi.fn((args) => {
                    return db.users.find(u =>
                        u.email === args.where.OR[0].email ||
                        u.identification === args.where.OR[1].identification
                    ) || null;
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
                findUnique: vi.fn((args) => {
                    return db.users.find(u => u.email === args.where.email) || null;
                })
            }
        };
    });


    // resgisterUser
    it('Dado un email existente, Cuando se registra el usuario, Entonces devuelve error', async () => {
        const userData = {
            firstName: "Carlos",
            lastName: "Pérez",
            identification: "88888888",
            phone: "0991111111",
            role: "Instructor",
            email: "paciente.sinseries@vitalshanti.com", // email existente
            password: plainPassword
        };

        const result = await registerUser(userData, prismaMock);

        expect(result.success).toBe(false);
        expect(result.message).toContain("Ya existe un usuario");
    });

    it('Dado una cédula existente, Cuando se registra el usuario, Entonces devuelve error', async () => {
        const userData = {
            firstName: "Carlos",
            lastName: "Pérez",
            identification: "1234567890", // existe en mockData
            phone: "0991111111",
            role: "Instructor",
            email: "nuevo@vitalshanti.com",
            password: plainPassword
        };

        const result = await registerUser(userData, prismaMock);

        expect(result.success).toBe(false);
        expect(result.message).toContain("Ya existe un usuario");
    });

    it('Dado datos válidos, Cuando se registra el usuario, Entonces lo crea exitosamente', async () => {
        const userData = {
            firstName: "Carlos",
            lastName: "Pérez",
            identification: "7777777777",
            phone: "0991111111",
            role: "Instructor",
            email: "nuevo@vitalshanti.com",
            password: plainPassword
        };

        const result = await registerUser(userData, prismaMock);

        expect(result.success).toBe(true);
        expect(result.user).toBeDefined();
        expect(result.user.id).toBeGreaterThan(0);
        expect(result.user.email).toBe("nuevo@vitalshanti.com");

        // Verificar el hash
        const passwordMatch = await bcrypt.compare(plainPassword, result.user.password);
        expect(passwordMatch).toBe(true);
    });

    it('Dado un error en la creación, Cuando se registra el usuario, Entonces devuelve mensaje de error', async () => {
        const userData = {
            firstName: "Carlos",
            lastName: "Pérez",
            identification: "7777777777",
            phone: "0991111111",
            role: "Instructor",
            email: "nuevoerror@vitalshanti.com",
            password: "demo123"
        };

        // Forzar que NO exista previamente el usuario
        prismaMock.user.findFirst = vi.fn(() => null);

        // Forzar que falle el create
        prismaMock.user.create = vi.fn(() => {
            throw new Error("Fallo de DB");
        });

        const result = await registerUser(userData, prismaMock);

        expect(result.success).toBe(false);
        expect(result.message).toContain("Error al registrar usuario");
    });

    // Tests para loginUser


    describe('Tests de loginUser - login@test.com', () => {

        it('Dado un email inexistente, Cuando se hace login, Entonces devuelve null', async () => {
            const result = await loginUser("noexiste@vitalshanti.com", plainPassword, prismaMock);
            expect(result).toBeNull();
        });

        it('Dado un email correcto pero password incorrecto, Cuando se hace login, Entonces devuelve null', async () => {
            const result = await loginUser("login@test.com", "clave_incorrecta", prismaMock);
            expect(result).toBeNull();
        });

        it('Dado email y password correctos, Cuando se hace login, Entonces devuelve el usuario', async () => {
            const result = await loginUser("login@test.com", plainPassword, prismaMock);

            expect(result).toBeDefined();
            expect(result.id).toBe(900);
            expect(result.email).toBe("login@test.com");
            expect(result.firstName).toBe("Usuario");
            expect(result.lastName).toBe("Login Test");
            expect(result.role).toBe("Instructor");
        });
    });
});
