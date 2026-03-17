/**
 * TASKFLOW PRO - Server Entry Point
 */

const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/task.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/v1/tasks', taskRoutes);

// Health check endpoint
app.get('/', (req, res) => {
    res.status(200).send('TaskFlow API is online');
});

// Export for Vercel environment
module.exports = app;

// Start server only in local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}