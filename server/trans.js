const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    return console.error('Error opening database:', err.message);
  }
  console.log('Connected to the database.');
});

const x = `CREATE TABLE IF NOT EXISTS transactions (
  transaction_id INTEGER PRIMARY KEY,
  amount REAL,
  expense_name TEXT,
  transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id)
)`;

db.run(x, (err) => {
  if (err) {
    return console.error('Error creating table:', err.message);
  }
  console.log('Transactions table created or already exists.');
});