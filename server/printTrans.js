const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db')

db.all(`SELECT * FROM transactions`, [], (err, rows) => {
    if (err) {
        throw err;
    }
    console.log(rows);
});

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
});