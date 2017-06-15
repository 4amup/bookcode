const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Hello World');
}).listen(3000);

console.log('server at http://localhost:3000');