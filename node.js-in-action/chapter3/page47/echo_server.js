const net = require('net')

let server = net.createServer((c) => {
  console.log('client connected')
  c.on('data', (data) => {
    c.write(data)
  })
  c.on('end', () => {
    console.log('client disconnected');
  });
})

server.listen(8888, () => {
  console.log('server run 127.0.0.1 8000')
})