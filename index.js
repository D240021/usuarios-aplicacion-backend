const express = require('express');
const app = express();
const usersRoutes = require('./users');
const mongoose = require('mongoose');

app.use(express.json()); // para recibir JSON en las peticiones
app.use('/api', usersRoutes); // todas las rutas empiezan con /api
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

mongoose.connect('mongodb+srv://adminAtlas:Cmzg2wDWvmjeY6Ys@prueba.cdildxx.mongodb.net/?retryWrites=true&w=majority&appName=Prueba')
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
    app.listen(3000, () => {
      console.log('🚀 Servidor corriendo en http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('❌ Error al conectar a MongoDB:', err);
  });
