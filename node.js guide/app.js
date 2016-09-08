var http = require('http');

http.createServer(function (request,response) {
  response.writeHead(200,{'Content-Type':'text/html'});
  response.write('<h1>Node.JS</h1>');
  response.end('<p>Hello World!</p>');
}).listen(3000);
console.log("HTTP server is listening at port 3000");