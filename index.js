const express = require('express');
const app = express();
const usersRoutes = require('./users');
const mongoose = require('mongoose');

app.use(express.json()); 
app.use('/api', usersRoutes); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
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
