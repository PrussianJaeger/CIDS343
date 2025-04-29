const sqlite3 = require('sqlite3').verbose();
const express = require("express");
const cors = require("cors");
const session = require('express-session');

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(session({
  secret: 'supersecretkey', // Use a secure env variable in production
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
    console.error("❌ Database connection error:", err.message);
  } else {
    console.log("✅ Connected to the SQLite database.");
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

app.post("/add-transaction", (req, res) => {
  const { amount, expense_name, user_id } = req.body;

  console.log(req.body);

  if (!amount || !expense_name || !user_id) {
    return res.status(400).json({ error: "Amount, expense name, and user ID are required." });
  }

  const insertQuery = 
  `INSERT INTO transactions (amount, expense_name, user_id) VALUES (?, ?, ?)`;

  db.run(insertQuery, [amount, expense_name, user_id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Database error when inserting transaction." });
    }

    const selectQuery = "SELECT * FROM transactions WHERE transaction_id = ?";
    db.get(selectQuery, [this.lastID], (err, transaction) => {
      if (err) {
        return res.status(500).json({ error: "Failed to retrieve transaction after insert." });
      }

      res.json({ message: "Transaction added successfully!", transaction });
    });
  });
});

app.get("/transactions", (req, res) => {
  const userId = req.session.user?.id;

  console.log(req.session.user?.id);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized. Please log in." });
  }

  const selectQuery = `
    SELECT * FROM transactions
    WHERE user_id = ?
    ORDER BY transaction_date DESC
  `;

  db.all(selectQuery, [userId], (err, transactions) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch transactions." });
    }

    res.json({ transactions });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});