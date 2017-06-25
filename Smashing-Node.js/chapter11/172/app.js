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
  console.log('Someone connected');
});

// 监听端口
server.listen(3000, () => {
  console.log('run at http://localhost:3000');
})