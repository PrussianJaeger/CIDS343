const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    return console.error('Error opening database:', err.message);
  }
  console.log('Connected to the database.');
});

const addSalaryColumnSQL = `ALTER TABLE users ADD COLUMN monthlySalary INTEGER`;

db.run(addSalaryColumnSQL, function (err) {
  if (err) {
    console.error('Error adding salary column:', err.message);
  } else {
    console.log('Salary column added successfully.');
  }
});

db.close((err) => {
  if (err) {
    return console.error('Error closing database:', err.message);
  }
  console.log('Database connection closed.');
});