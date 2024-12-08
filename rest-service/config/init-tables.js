function initializeTables(db) {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS welcome_message (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            message TEXT NOT NULL
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS services (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            price REAL
        )`);

        db.get('SELECT * FROM welcome_message LIMIT 1', [], (err, row) => {
            if (!row) {
                db.run(`INSERT INTO welcome_message (message) VALUES (?)`, 
                    ["Welcome to Mahesh Photography Services"]);
            }
        });

        db.get('SELECT * FROM services LIMIT 1', [], (err, row) => {
            if (!row) {
                const services = [
                    {
                        name: "Portrait Photography",
                        description: "Capture the essence of your personality in timeless portraits.",
                        price: 160.00
                    },
                    {
                        name: "Event Photography",
                        description: "Document every important moment of your event with professional photography.",
                        price: 300.00
                    },
                    {
                        name: "Corporate Photography",
                        description: "Professional photography to represent your brand image.",
                        price: 250.00
                    },
                    {
                        name: "Wedding Photography",
                        description: "Preserve the beauty and romance of your wedding day forever.",
                        price: 500.00
                    }
                ];

                const stmt = db.prepare('INSERT INTO services (name, description, price) VALUES (?, ?, ?)');
                services.forEach(service => {
                    stmt.run(service.name, service.description, service.price);
                });
                stmt.finalize();
            }
        });
    });
}

module.exports = initializeTables;