const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'sam_johnson',           // Use the user you created
  password: 'password0',    // Use the password you set
  database: 'my_database'     // The database you created
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + db.threadId);
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database query failed' });
    } else {
      res.json(results); // Send fetched data as JSON
    }
  });
});

app.get("/api", (req, res) => {
  res.json({ name: "Sam Johnson" }); // Sent as an object
});

app.listen(5001, () => { console.log('Server running on port 5001') });
