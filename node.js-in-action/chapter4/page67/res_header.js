const http = require('http')

let server = http.createServer((req, res) => {
  let body = 'Hello World'
  res.setHeader('Content-Length', body.length)
  res.setHeader('Content-Type', 'text/html')
  res.end(body)
})

server.listen(3008, () => {
  console.log('run at http://localhost:3008')
})