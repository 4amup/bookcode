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

// 记录客户端信息
let positions = {},
    total = 0;

// wss事件
wss.on('connection', function connection (ws, req) {
  // 为客户端分配ID
  ws.id = ++total;

  // 向除本客户端发送全部客户端的位置信息
  ws.send(JSON.stringify(positions));

  // 存储对象
  ws.on('message', (msg) => {

    let pos = JSON.parse(msg);

    positions[ws.id] = pos;

    // 广播
    broadcast(JSON.stringify({type: 'position', pos: pos, id: ws.id}));
  });

  // 客户端断开连接后，清除他的位置信息
  ws.on('close', () => {
    delete positions[ws.id];
    // 广播
    broadcast(JSON.stringify({type: 'disconnect', id: ws.id}));    
  });

  function broadcast(msg) {
    wss.clients.forEach(function each(client) {
      // if (client != ws) {
        client.send(msg);
      // }
    });
  };
});

// 监听端口
server.listen(3000, function listening() {
  console.log('run at http://localhost:3000');
});