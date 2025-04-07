// main backend server file

const sqlite3 = require('sqlite3').verbose(); // Import sqlite3
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(cors()); 

let currentUser = null;

// Open SQLite database
const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Create table if it doesn't exist
db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`,
  (err) => {
    if (err) {
      console.error("Error creating table:", err.message);
    }
  }
);

app.post("/signup", (req, res) => {
  console.log("Incoming request:", req.body);

  const { email, password } = req.body;

  console.log('signup', email, password); // check if request is working

  if (!email || !password) {
    console.log("Missing email or password");
    return res.status(400).json({ error: "Email and password are required." });
  }

  const insertQuery = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.run(insertQuery, [email, password], function (err) {
    if (err) {
      console.error("Database insert error:", err.message);
      if (err.message.includes("UNIQUE constraint failed")) {
        return res.status(400).json({ error: "Email already exists." });
      }
      return res.status(500).json({ error: "Database error." });
    }

    console.log("User added:", { id: this.lastID, email });
    res.json({ message: "User added successfully!", userId: this.lastID });
  });
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  console.log('login', email, password); // check if request is working

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const selectQuery = "SELECT * FROM users WHERE email = ?";

  db.get(selectQuery, [email], (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Database error." });
    }

    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password." });
    }

    currentUser = { id: user.id, email: user.email }; 
    res.json({ message: "Login successful!", userId: currentUser });
  });
});

app.get("/profile", (req, res) => {
  if (!currentUser) {
    return res.status(401).json({ error: "No user is logged in." });
  }

  res.json({ user: currentUser });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});