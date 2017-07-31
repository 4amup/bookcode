const events = require('events')
const net = require('net')

let channel = new events.EventEmitter()

channel.clients = {} // 自定义了一个对象存放客户端
channel.subscriptions = {} // 自定义了订阅者

// 自定义加入事件
channel.on('join', function (id, client) {
  this.clients[id] = client
  this.subscriptions[id] = function (senderId, message) {
    if (id != senderId) {
      this.clients[id].write(message)
    }
  }
  this.on('broadcast', this.subscriptions[id])
})

// 自定义离开事件
channel.on('leave', id => {
  channel.removeListener('broadcast', this.subscriptions[id])
  channel.emit('broadcast', id, id + ' has left the chat.\n')
})

// 自定义停止聊天服务的事件
channel.on('shutdown', () => {
  channel.emit('broadcast', '', 'chat has shot down.\n')
  channel.removeAllListeners('broadcast')
})

const server = net.createServer((client) => {
  let id = client.remoteAddress + ':' + client.remotePort
  client.on('connect', () => {
    channel.emit('join', id, client)
  })
  client.on('data', (data) => {
    data = data.toString()
    if (data === 'shutdown\r\n') {
      channel.emit('shutdown')
    }
    channel.emit('broadcast', id, data)
  })
  client.on('close', () => {
    channel.emit('leave', id)
  })
})

server.listen(8888)