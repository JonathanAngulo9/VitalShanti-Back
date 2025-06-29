import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prismaDefault = new PrismaClient();
const saltRounds = 10;

/**
 * Inicia sesión de usuario verificando email y contraseña cifrada
 */
export const loginUser = async (email, password, prisma=prismaDefault) => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    return null;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return null;
  }

  return user;
};

/**
 * Registra un nuevo usuario cifrando la contraseña
 */
export const registerUser = async (userData, prisma = prismaDefault) => {
  const { email, identification } = userData;

  // Verifica si ya existe un usuario con el mismo email o identificación
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { identification }
      ]
    }
  });

  if (existingUser) {
    return {
      success: false,
      message: "Ya existe un usuario con ese correo o identificación"
    };
  }

  try {
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        identification,
        phone: userData.phone,
        role: userData.role,
        email,
        password: hashedPassword
      }
    });

    return { success: true, user: newUser };

  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return { success: false, message: "Error al registrar usuario" };
  }
};

