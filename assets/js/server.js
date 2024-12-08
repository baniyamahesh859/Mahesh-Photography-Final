const express = require('express');
const cors = require('cors');
const path = require('path');
const initializeDatabase = require('./config/database');
const initializeTables = require('./config/init-tables');

const app = express();

// Initialize database and tables
const db = initializeDatabase();
initializeTables(db);

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
const servicesRoutes = require('./routes/services')(db);
app.use('/api', servicesRoutes);

// Fallback to serve HTML files
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
