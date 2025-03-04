const mysql = require('mysql2');
    
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root', // Use your MySQL username
  password: 'W6BjjngNf', // Use your MySQL password
  database: 'group_3'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

connection.query('SELECT * FROM Users', (err, results, fields) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    console.log('Query results:', results);
  });

  connection.end((err) => {
    if (err) {
      console.error('Error closing connection:', err);
      return;
    }
    console.log('Connection closed.');
  });