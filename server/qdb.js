// main backend server file

const sqlite3 = require('sqlite3').verbose(); // Import sqlite3
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

const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

app.use(session({
  secret: 'supersecretkey', // Change this to something strong and secure
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

app.post("/signup", (req, res) => {
  console.log("Incoming signup request:", req.body);

  const { email, password } = req.body;

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

    req.session.user = { id: this.lastID, email };

    console.log("User added and session created:", req.session.user);
    res.json({ message: "User added and logged in successfully!", userId: this.lastID });
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

    req.session.user = { id: user.id, email: user.email };
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
      console.error("Logout error:", err);
      return res.status(500).json({ error: "Logout failed." });
    }
    res.clearCookie("connect.sid"); // default session cookie name
    res.json({ message: "Logged out successfully." });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});