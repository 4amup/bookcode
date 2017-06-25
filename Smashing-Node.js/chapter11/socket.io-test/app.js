const express = require('express'),
      http = require('http');

let app = express();
let server = http.Server(app);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3000, () => {
  console.log('run at http://localhost:3000');
});