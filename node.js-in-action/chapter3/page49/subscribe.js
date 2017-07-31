const events = require('events')
const net = require('net')

let channel = new events.EventEmitter()

channel.clients = {} // 自定义了一个对象存放客户端
channel.subscriptions = {} // 自定义了订阅者

channel.on('join', function (id, client) {
  this.clients[id] = client
  this.subscriptions[id] = function (senderId, message) {
    if (id != senderId) {
      this.clients[id].write(message)
    }
  }
  this.on('broadcast', this.subscriptions[id])
})

const server = net.createServer((client) => {
  let id = client.remoteAddress + ':' + client.remotePort
  client.on('connect', () => {
    channel.emit('join', id, client)
  })
  client.on('data', data => {
    data = data.toString()
    channel.emit('broadcast', id, data)
  })
})

server.listen(8888)