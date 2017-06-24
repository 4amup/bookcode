const express = require('express'),
      http = require('http'),
      WebSocket = require('ws');

// 初始化app
let app = express();

// 建立ws服务器
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 设置静态文件夹
app.use(express.static('public'));

// wss事件
wss.on('connection', function connection (ws, req) {
  
  ws.on('message', function incoming(message) {
    console.log(`received ${message}`);
  });
  ws.send('something');
});

// 监听端口
server.listen(3000, () => {
  console.log('app run at http://localhost:3000');
});