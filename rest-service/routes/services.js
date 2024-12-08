const express = require('express');
const router = express.Router();

module.exports = (db) => {

    router.get('/welcome', (req, res) => {
        db.get('SELECT message FROM welcome_message ORDER BY id DESC LIMIT 1', [], (err, row) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ message: row ? row.message : "Welcome to Mahesh Photography Services" });
        });
    });

    router.get('/services', (req, res) => {
        db.all('SELECT * FROM services', [], (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(rows);
        });
    });
    
    return router;
};