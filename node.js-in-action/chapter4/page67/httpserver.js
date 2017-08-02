const http = require('http')

let server = http.createServer((req, res) => {
  res.end('Hello World')
})

server.listen(3008, () => {
  console.log('run at http://localhost:3008')
})