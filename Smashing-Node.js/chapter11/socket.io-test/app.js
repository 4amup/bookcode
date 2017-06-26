const express = require('express'),
      http = require('http'),
      socket = require('socket.io');

// 实例初始化过程
let app = express();
let server = http.Server(app);
let io = socket(server);

// 简单路由返回一个首页
app.get('/', (req, res) => {
  // res.sendFile()是express4的一个API
  res.sendFile(__dirname + '/index.html');
});

// 添加socket.io的连接监听
io.on('connection', (socket) => {
  console.log('a user connected');
  // 监听断开事件
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  // 监听消息
  socket.on('chat message', (msg) => {
    // console.log(`message: ${msg}`);
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('run at http://localhost:3000');
});