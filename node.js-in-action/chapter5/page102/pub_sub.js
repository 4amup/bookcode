const net = require('net'),
      redis = require('redis')

let server = net.createServer(socket => {
  let subscriber, publisher

  socket.on('connect', () => {
    // 为用户创建预订客户端
    subscriber = redis.createClient()
    // 预订信道
    subscriber.subscribe('main_chat_room')
    // 信道收到消息后，发给用户
    subscriber.on('message', (channel, message) => {
      socket.write(`Channel ${channel}:${message}`)
    })
    // 为用户创建发布客户端
    publisher = redis.createClient()
    // 用户输入消息后发布
    socket.on('data', data => {
      publisher.publish('main_chat_room')
    })
    // 如果用户断开连接，则终止客户端连接
    socket.on('end', () => {
      subscriber.unsubscribe('main_chat_room')
      subscriber.end()
      publisher.end()
    })
  })
})

// 启动聊天服务器
server.listen(3000, () => {
  console.log('pub_sub.js run...')
})