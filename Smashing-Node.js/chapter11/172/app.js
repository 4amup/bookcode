const express = require('express'),
      http = require('http'),
      bodyParser = require('body-parser'),
      Socket = require('socket.io');

// 创建app
let app = express();
let server = http.Server(app);
let io = Socket(server);

// 静态资源
app.use(express.static('public'));

// 设置连接见监听
io.on('connection', (socket) => {
  // 添加对join事件的监听
  socket.on('join', (name) => {
    socket.nickname = name;
    // socket.broadcast.emit('announcement', `${name} joined the chat.`);
    io.emit('announcement', `${name} joined the chat.`);
  });

  // 添加对text事件的监听
  socket.on('text', (msg) => {
    socket.broadcast.emit('text', socket.nickname, msg);
  });
  // 添加离开事件
  socket.on('disconnect', (name) => {
    io.emit('announcement', `${socket.nickname} left the chat.`)
  })
});

// 监听端口
server.listen(3000, () => {
  console.log('run at http://localhost:3000');
});