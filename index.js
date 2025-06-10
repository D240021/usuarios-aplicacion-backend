const express = require('express');
const app = express();
const usersRoutes = require('./users');
const mongoose = require('mongoose');
const pidusage = require('pidusage');
const fs = require('fs');
const path = require('path');

app.use(express.json()); 
app.use('/api', usersRoutes); 

const PORT = process.env.PORT || 3000;
const logFile = path.join(__dirname, 'cpu_ram_log.txt');

// Función para escribir en el archivo de log
function logUsage(cpu, memoryMB) {
  const timestamp = new Date().toISOString();
  const logLine = `${timestamp} | CPU: ${cpu.toFixed(2)}% | RAM: ${memoryMB.toFixed(2)} MB\n`;
  fs.appendFileSync(logFile, logLine, 'utf8');
}

// Monitoreo cada 5 segundos
setInterval(() => {
  pidusage(process.pid, (err, stats) => {
    if (err) {
      console.error('Error obteniendo métricas:', err);
      return;
    }
    const memoryMB = stats.memory / 1024 / 1024; // Convertir de bytes a MB
    const cpu = stats.cpu;

    console.log(`🧠 RAM usada: ${memoryMB.toFixed(2)} MB`);
    console.log(`⚙️  CPU usada: ${cpu.toFixed(2)} %`);
    console.log('------------------------');

    logUsage(cpu, memoryMB);
  });
}, 10000);

mongoose.connect('mongodb+srv://adminAtlas:Cmzg2wDWvmjeY6Ys@prueba.cdildxx.mongodb.net/?retryWrites=true&w=majority&appName=Prueba')
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error al conectar a MongoDB:', err);
  });
