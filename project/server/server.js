const express = require('express')
const app = express()

app.get("/api", (req, res) => {
  res.json({users: ['userOne', 'userTwo']})
})

app.listen(5001, () => {console.log('running')})