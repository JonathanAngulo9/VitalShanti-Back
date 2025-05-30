import { loginUser, registerUser } from '../services/userService.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginUser(email, password); // ✅ Espera la promesa

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Usuario o contraseña incorrectos"
      });
    }

    console.log("Usuario autenticado:", user);

    return res.json({
      success: true,
      token: 'fake-jwt-token-123456',
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

