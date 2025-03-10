const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get("/api", (req, res) => {
  res.json({ name: "Sam Johnson" }); // Sent as an object
});

app.listen(5001, () => { console.log('Server running on port 5001') });
