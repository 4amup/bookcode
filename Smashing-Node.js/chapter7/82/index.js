const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Hello');

  setTimeout(() => {
    res.end('World');
  }, 500);
}).listen(3000);

console.log('server at http://localhost:3000');