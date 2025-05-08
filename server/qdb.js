const sqlite3 = require('sqlite3').verbose();
const express = require("express");
const cors = require("cors");
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// DB Connection
const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to the SQLite3 database.");
    // Create transactions table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS transactions (
      transactionId INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      amount REAL NOT NULL,
      description TEXT,
      category TEXT,
      date TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    )`);
  }
});

// Utility
const validateCredentials = (email, password) => {
  return email && password;
};

// Routes
app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  if (!validateCredentials(email, password)) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const insertQuery = "INSERT INTO users (email, password, monthlySalary) VALUES (?, ?, ?)";
  db.run(insertQuery, [email, password, 0], function (err) {
    if (err) {
      if (err.message.includes("UNIQUE constraint failed")) {
        return res.status(400).json({ error: "Email already exists." });
      }
      return res.status(500).json({ error: "Database error." });
    }

    const selectQuery = "SELECT * FROM users WHERE id = ?";
    db.get(selectQuery, [this.lastID], (err, user) => {
      if (err) {
        return res.status(500).json({ error: "Failed to retrieve user after insert." });
      }

      req.session.user = { id: user.id, email: user.email, salary: user.monthlySalary };
      res.json({ message: "User signed up and logged in!", userId: user.id });
    });
  });
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!validateCredentials(email, password)) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const query = "SELECT * FROM users WHERE email = ?";
  db.get(query, [email], (err, user) => {
    if (err) return res.status(500).json({ error: "Database error." });
    if (!user) return res.status(401).json({ error: "User not found." });
    if (user.password !== password) return res.status(401).json({ error: "Invalid password." });

    req.session.user = { id: user.id, email: user.email, salary: user.monthlySalary };
    res.json({ message: "Login successful!", userId: user.id });
  });
});

app.get("/profile", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "No user is logged in." });
  }

  res.json({ user: req.session.user });
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed." });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully." });
  });
});

app.post("/get-salary", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required." });

  const query = "SELECT monthlySalary FROM users WHERE email = ?";
  db.get(query, [email], (err, user) => {
    if (err) return res.status(500).json({ error: "Database query failed." });
    if (!user) return res.status(404).json({ error: "User not found." });

    res.json({ salary: user.monthlySalary });
  });
});

app.post("/set-salary", (req, res) => {
  const { email, salary } = req.body;
  if (!email || typeof salary !== "number") {
    return res.status(400).json({ error: "Valid email and salary are required." });
  }

  const query = "UPDATE users SET monthlySalary = ? WHERE email = ?";
  db.run(query, [salary, email], function (err) {
    if (err) return res.status(500).json({ error: "Failed to update salary." });

    res.json({ message: "Salary updated successfully.", changes: this.changes });
  });
});

app.post("/transactions", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required." });

  const query = `
    SELECT t.* 
    FROM transactions t
    JOIN users u ON t.userId = u.id
    WHERE u.email = ?
    ORDER BY t.date DESC
  `;

  db.all(query, [email], (err, transactions) => {
    if (err) return res.status(500).json({ error: "Failed to fetch transactions." });
    res.json({ transactions });
  });
});

app.post("/add-transaction", (req, res) => {
  const { email, amount, description, category } = req.body;
  if (!email || !amount || !description || !category) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // First get the userId from email
  db.get("SELECT id FROM users WHERE email = ?", [email], (err, user) => {
    if (err) return res.status(500).json({ error: "Database error." });
    if (!user) return res.status(404).json({ error: "User not found." });

    // Then insert the transaction
    const insertQuery = `
      INSERT INTO transactions (userId, amount, description, category)
      VALUES (?, ?, ?, ?)
    `;

    db.run(insertQuery, [user.id, amount, description, category], function(err) {
      if (err) return res.status(500).json({ error: "Failed to add transaction." });
      
      res.json({ 
        message: "Transaction added successfully",
        transactionId: this.lastID
      });
    });
  });
});

app.post("/change-password", (req, res) => {
  const { password } = req.body;
  const userId = req.session?.user?.id;

  if (!userId || !password || password.length < 2) {
    return res.status(400).json({ error: "Invalid session or password too short." });
  }

  const updateQuery = "UPDATE users SET password = ? WHERE id = ?";
  db.run(updateQuery, [password, userId], function (err) {
    if (err) {
      console.error("Error updating password:", err.message);
      return res.status(500).json({ error: "Database error while changing password." });
    }

    res.json({ message: "Password changed successfully." });
  });
});

app.post("/change-email", (req, res) => {
  const { email } = req.body;
  const userId = req.session?.user?.id;

  if (!userId || !email || email.length < 2) {
    return res.status(400).json({ error: "Invalid session or email too short." });
  }

  const updateQuery = "UPDATE users SET email = ? WHERE id = ?";
  db.run(updateQuery, [email, userId], function (err) {
    if (err) {
      console.error("Error updating email:", err.message);
      return res.status(500).json({ error: "Database error while changing email." });
    }

    res.json({ message: "email changed successfully." });
  });
});

// Route to get savings data
app.post('/get-savings', (req, res) => {
  const { email } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (err) {
      console.error('Error fetching savings data:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (!row) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      monthlySalary: row.monthlySalary,
      monthly_goal: row.monthlyGoal,
      total_monthly_savings: row.totalMonthlySavings,
      total_savings: row.totalSavings
    });
  });
});

// Route to update savings data
app.post('/update-savings', (req, res) => {
  const { email, field, value } = req.body;
  
  const fields = ['monthlySalary', 'monthlyGoal', 'totalMonthlySavings', 'totalSavings'];
  
  if (!fields.includes(field)) {
    return res.status(400).json({ error: 'Invalid field' });
  }

  const query = `UPDATE users SET ${field} = ? WHERE email = ?`;

  db.run(query, [value, email], function(err) {
    if (err) {
      console.error('Error updating savings:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});