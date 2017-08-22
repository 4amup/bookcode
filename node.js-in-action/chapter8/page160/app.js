const express = require('express')
let app = express()

app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})