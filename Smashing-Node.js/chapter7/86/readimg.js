const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'image/png'});

  fs.createReadStream('image.png').pipe(res);
  
}).listen(3000);
console.log('server run at http://localhost:3000');