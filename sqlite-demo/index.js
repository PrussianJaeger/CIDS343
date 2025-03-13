const sqlite3 = require('sqlite3').verbose();

// Connect to a database (or create one)
const db = new sqlite3.Database('./mydatabase.db');

// Create a table
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
)`);

// Insert data
db.run(`INSERT INTO users (name) VALUES (?)`, ['Westin']);

// Query data
db.all(`SELECT * FROM users`, (err, rows) => {
    if (err) throw err;
    console.log(rows);
});

// Close connection
db.close();
 