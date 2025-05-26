import mockUsers from '../data/mockData.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user =
    mockUsers.instructores.find(u => u.email === email) ||
    mockUsers.pacientes.find(u => u.email === email);

  if (!user) {
    return res.status(401).json({ message: "Usuario no encontrado" });
  }

  if (user.password !== password && user.password !== user.contraseña) {
    return res.status(401).json({ message: "Contraseña incorrecta" });
  }

  res.json({
    success: true,
    token: 'fake-jwt-token-123456',
    user,
    message: "Inicio de sesión exitoso"
  });
};

export const registerInstructor = (req, res) => {
  const { nombres, apellidos, ruc, telefono, correo, contraseña } = req.body;

  if (mockUsers.instructores.find(u => u.email === correo)) {
    return res.json({ success: false, message: 'Correo ya registrado' });
  }

  mockUsers.instructores.push({ nombres, apellidos, ruc, telefono, email, password });
  res.json({ success: true, message: 'Instructor registrado exitosamente' });
};

export const registerPaciente = (req, res) => {
  const { nombres, apellidos, cedula, telefono, email, password } = req.body;

  if (mockUsers.pacientes.find(u => u.email === email)) {
    return res.json({ success: false, message: 'Correo ya registrado' });
  }

  mockUsers.pacientes.push({ nombres, apellidos, cedula, telefono, email, password });
  res.json({ success: true, message: 'Paciente registrado exitosamente' });
};
