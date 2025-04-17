const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    return console.error('Error opening database:', err.message);
  }
  console.log('Connected to the database.');
});

// Example: assume user with id 1 already exists in `users`
const dummyTransactions = [
  { amount: 19.99, expense_name: 'Lunch', user_id: 1 },
  { amount: 120.00, expense_name: 'Groceries', user_id: 1 },
  { amount: 59.49, expense_name: 'Gas', user_id: 1 },
  { amount: 12.50, expense_name: 'Coffee', user_id: 1 },
  { amount: 300.00, expense_name: 'Rent', user_id: 1 }
];

const insertStmt = db.prepare(`
  INSERT INTO transactions (amount, expense_name, user_id)
  VALUES (?, ?, ?)
`);

dummyTransactions.forEach((txn) => {
  insertStmt.run(txn.amount, txn.expense_name, txn.user_id, (err) => {
    if (err) {
      return console.error('Error inserting transaction:', err.message);
    }
    console.log(`Inserted: ${txn.expense_name} - $${txn.amount}`);
  });
});

insertStmt.finalize(() => {
  console.log('All dummy transactions inserted.');
  db.close();
});