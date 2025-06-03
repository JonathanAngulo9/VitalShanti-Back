import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verificar si viene el encabezado
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Token no proporcionado o malformado'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Ahora tienes acceso al usuario en req.user
    next();
  } catch (err) {
    console.error("Error verificando token:", err);
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado'
    });
  }
};
