import express from "express";
import jwt from "jsonwebtoken";
import mockUsers from "../data/users.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = mockUsers.find(u => u.email === email);

  if (!user) return res.status(401).json({ message: "Usuario no encontrado" });

  if (user.password !== password) return res.status(401).json({ message: "Contraseña incorrecta" });

  res.json({
      success: true,
      token: 'fake-jwt-token-123456',
      user: user,
      message: "Inicio de sesión exitoso"
    });
});

export default router;
