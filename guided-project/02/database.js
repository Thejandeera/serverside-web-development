var sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database');
        db.run(`DROP TABLE IF EXISTS products`, (err) => {
            if (err) {
                console.error(err.message);
                throw err;
            } else {
                db.run(`CREATE TABLE products (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    productName TEXT,
                    description TEXT,
                    category TEXT,
                    brand TEXT,
                    expireDate TEXT,
                    manufactureDate TEXT,
                    batchNumber INTEGER,
                    unitPrice REAL,
                    quantity INTEGER,
                    createDate TEXT
                )`, (err) => {
                    if (err) {
                        console.error(err.message);
                        // Table already created or some other error
                    } else {
                        var insert = 'INSERT INTO products (productName, description, category, brand, expireDate, manufactureDate, batchNumber, unitPrice, quantity, createDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                        db.run(insert, [
                            "white basmathi rice",
                            "white basmathi rice imported from Pakistan",
                            "rice",
                            "CIC",
                            "2023.05.04",
                            "2022.02.20",
                            324567,
                            200,
                            1020,
                            "2022.02.24"
                        ]);
                    }
                });
            }
        });
    }
});

module.exports = db;
