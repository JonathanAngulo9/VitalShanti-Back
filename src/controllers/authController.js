import { loginUser, registerUser } from '../services/userService.js';

export const login = (req, res) => {
  const { email, password } = req.body;

  const user = loginUser(email, password);
  if (!user) {
    return res.status(401).json({ success: false, message: "Usuario o contraseña incorrectos" });
  }

  return res.json({
    success: true,
    token: 'fake-jwt-token-123456',
    user,
    message: "Inicio de sesión exitoso"
  });
};

export const registerInstructor = (req, res) => {
  const { name, last_name, identification, phone, email, password } = req.body;

  const result = registerUser({
    name,
    last_name,
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
};

export const registerPaciente = (req, res) => {
  const { name, last_name, identification, phone, email, password } = req.body;

  const result = registerUser({
    name,
    last_name,
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
};
