import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const saltRounds = 10;

/**
 * Inicia sesión de usuario verificando email y contraseña cifrada
 */
export const loginUser = async (email, password) => {
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
export const registerUser = async (userData) => {
  const { email } = userData;

  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    return { success: false, message: "El correo ya está registrado" };
  }

  try {
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        identification: userData.identification,
        phone: userData.phone,
        role: userData.role,
        email: userData.email,
        password: hashedPassword
      }
    });

    return { success: true, user: newUser };

  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return { success: false, message: "Error al registrar usuario" };
  }
};
