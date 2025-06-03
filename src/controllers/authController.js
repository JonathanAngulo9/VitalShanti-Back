import { loginUser, registerUser } from '../services/userService.js';

//Token
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
//

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginUser(email, password); 

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Usuario o contraseña incorrectos"
      });
    }

    // Token JWT
    const token = jwt.sign(
      { id: user.id, rol: user.role, email: user.email }, // payload
      JWT_SECRET,
      { expiresIn: '1h' } // expira en 1 hora
    );

    console.log("Usuario autenticado:", user);
    console.log("Token generado:", token);

    return res.json({
      success: true,
      token,
      user,
      message: "Inicio de sesión exitoso"
    });

  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor"
    });
  }
};


export const registerInstructor = async (req, res) => {
  const { firstName, lastName, identification, phone, email, password } = req.body;

  try {
    const result = await registerUser({
      firstName,
      lastName,
      identification,
      phone,
      email,
      password,
      role: "Instructor"
    });

    if (!result.success) {
      return res.json(result);
    }

    return res.json({ success: true, message: 'Instructor registrado exitosamente' });
  } catch (error) {
    console.error("Error registrando instructor:", error);
    return res.status(500).json({ success: false, message: "Error en el servidor" });
  }
};

export const registerPaciente = async (req, res) => {
  const { firstName, lastName, identification, phone, email, password } = req.body;

  try {
    const result = await registerUser({
      firstName,
      lastName,
      identification,
      phone,
      email,
      password,
      role: "Paciente"
    });

    if (!result.success) {
      return res.json(result);
    }

    return res.json({ success: true, message: 'Paciente registrado exitosamente' });
  } catch (error) {
    console.error("Error registrando paciente:", error);
    return res.status(500).json({ success: false, message: "Error en el servidor" });
  }
};

