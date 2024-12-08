const express = require('express');
const cors = require('cors');
const initializeDatabase = require('./config/database');
const initializeTables = require('./config/init-tables');

const app = express();

// Initialize database and tables
const db = initializeDatabase();
initializeTables(db);

app.use(cors());
app.use(express.json());

const servicesRoutes = require('./routes/services')(db);
app.use('/api', servicesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});