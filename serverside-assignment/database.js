var sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database');
        db.run(`DROP TABLE IF EXISTS customer`, (err) => {
            if (err) {
                console.error(err.message);
                throw err;
            } else {
                db.run(`CREATE TABLE customer (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    address TEXT,
                    email TEXT, 
                    dateOfBirth TEXT,
                    gender TEXT,
                    age INTEGER,
                    cardHolderName TEXT,
                    cardNumber INTEGER,
                    expireDate TEXT,
                    cvv INTEGER,
                    timeStamp TEXT
                )`, (err) => {
                    if (err) {
                        console.error(err.message);
                    } else {
                        var insert = 'INSERT INTO customer (name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expireDate, cvv, timeStamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                        db.run(insert, [
                            "A.D.Lakith Dharmasiri",
                            "No 324/A Ra De Mel Road, Colombo",
                            "lakith@gmail.com",
                            "1991.02.25",
                            "female",
                            28,
                            "A.D.L.Dharmasiri",
                            102445217895,
                            "12.2022",
                            246,
                            "2022.12.31 23:59:59"
                        ]);
                    }
                });
            }
        });
    }
});

module.exports = db;
