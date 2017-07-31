const net = require('net')

let server = net.createServer((c) => {
  console.log('client connected')
  c.once('data', (data) => { // 只监听一次这个事件
    c.write(data)
  })
  c.on('end', () => {
    console.log('client disconnected');
  });
})

server.listen(8888, () => {
  console.log('server run 127.0.0.1 8000')
})