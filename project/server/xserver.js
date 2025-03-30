const sqlite3 = require('sqlite3').verbose();

// Open (or create) a database file
const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create a table
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
)`);

// Insert data
db.run(`INSERT INTO users (name, email) VALUES (?, ?)`, ['Alice', 'alice@example.com'], function (err) {
    if (err) {
        return console.error(err.message);
    }
    console.log(`Inserted row with ID: ${this.lastID}`);
});

// Query data
db.all(`SELECT * FROM users`, [], (err, rows) => {
    if (err) {
        throw err;
    }
    console.log(rows);
});

// Close the database connection
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Closed the database connection.');
});