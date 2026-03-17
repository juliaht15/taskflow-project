const express = require('express');
const cors = require('cors'); // Asegúrate de que esto esté instalado: npm install cors
const taskRoutes = require('./routes/task.routes');

const app = express();
// Vercel asigna el puerto automáticamente, no fuerces el 3000
const PORT = process.env.PORT || 3000;

// CONFIGURACIÓN CLAVE: CORS abierto para evitar el error rojo en el Front
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Ruta de test para probar en el navegador
app.get('/api/status', (req, res) => {
    res.json({ message: "Servidor activo", status: "OK" });
});

app.use('/api/v1/tasks', taskRoutes);

// Exportar para que Vercel lo reconozca
module.exports = app;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});