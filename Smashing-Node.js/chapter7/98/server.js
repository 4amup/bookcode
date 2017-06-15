const http = require('http');
const qs = require('querystring');

http.createServer((req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    res.writeHead(200);
    res.end('Done');
    console.log(`got name: ${qs.parse(body).name}`);
  });
}).listen(3000);