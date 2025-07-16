import { loginUser, registerUser } from '../services/userService.js';
import { createPatient } from '../services/patientService.js';

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
  const {
    firstName,
    lastName,
    identification,
    phone,
    email,
    password
  } = req.body;

  if (!firstName || !lastName || !identification || !phone || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Faltan datos obligatorios para el registro del instructor"
    });
  }

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
    if (error.code === 'P1001') {
      return res.status(500).json({
        success: false,
        message: "No se pudo conectar con la base de datos"
      });
    }

    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        message: "Cédula ya registrada"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error interno del servidor"
    });
  }
};

export const registerPaciente = async (req, res) => {
  const {
    firstName,
    lastName,
    identification,
    phone,
    age,
    gender,
    medicalConditions,
    email,
    password,
    instructorId
  } = req.body;

  // ✅ Validación de campos obligatorios
  if (!firstName || !lastName || !identification || !phone || !age || !gender || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Faltan datos obligatorios para el registro del paciente"
    });
  }

  // ✅ Validar edad
  if (isNaN(age) || age < 0 || age > 120) {
    return res.status(400).json({
      success: false,
      message: "La edad debe ser un número válido entre 0 y 120"
    });
  }

  // ✅ Validar género
  const validGenders = ["Masculino", "Femenino", "Otro", "Prefiero no decir"];
  if (!validGenders.includes(gender)) {
    return res.status(400).json({
      success: false,
      message: "Género no válido"
    });
  }

  try {
    const sanitizedConditions = medicalConditions?.trim().slice(0, 1000) || "";
    const result = await createPatient({
      firstName,
      lastName,
      identification,
      phone,
      age: Number(age),
      gender,
      medicalConditions: sanitizedConditions,
      email,
      password,
    },
      instructorId
    );

    if (!result.success) {
      return res.json(result);
    }

    return res.json({
      success: true,
      message: 'Paciente registrado exitosamente'
    });

  } catch (error) {
    console.error("Error registrando paciente:", error);

    if (error.code === 'P1001') {
      return res.status(500).json({
        success: false,
        message: "No se pudo conectar con la base de datos"
      });
    }

    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        message: "Cédula ya registrada"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error interno del servidor"
    });
  }
};


