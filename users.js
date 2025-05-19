const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('./models/User');
const authMiddleware = require('./middlewares/middleware');
const SECRET_KEY = 'secreto_super_seguro'; // guardar en variables de entorno en producción

// Registro
router.post('/user/register', async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'El usuario ya existe' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: 'Usuario registrado exitosamente' });
});

//Obtener todos los usuarios
router.get('/user', async (req, res) => {
  try {
    const users = await User.find(); // ✅ esperamos a que termine
    res.json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ message: 'Credenciales inválidas' });

  const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });

  res.json({ message: 'Login exitoso', token });
});


router.get('/perfil', authMiddleware, (req, res) => {
  res.json({ message: `Hola ${req.user.email}, este es tu perfil privado.` });
});

module.exports = router;



