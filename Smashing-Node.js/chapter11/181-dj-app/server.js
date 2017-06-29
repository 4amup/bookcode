const express = require('express'),
      Socket = require('socket.io'),
      request = require('superagent'),
      http = require('http');

// 实例初始化
let app = express();
let server = http.Server(app);
let io = Socket(server);

// 静态资源
app.use(express.static('public'));

// 定义公共变量，状态变量
let currentSong, dj;

// 选择dj的函数
function elect (socket) {
  // 选取当前用户为DJ
  dj = socket;
  // 通知所有人DJ已经选取完毕
  io.emit('announcement', `${socket.nickname} is the new dj.`);
  // 单独发通知告诉当前dj他已经被选中，并给他添加个值为true的dj属性
  socket.emit('elected');
  socket.dj = true;
  // DJ断开时，通知所有人已经
  socket.on('disconnect', () => {
    dj = null;
    io.emit('announcement', `the dj ${socket.nickname} left - next one to join becomes dj.`)
  });
}

// 监听连接事件
io.on('connection', (socket) => {
  // 一个新的客户端加入事件
  socket.on('join', (name) => {
    socket.nickname = name;
    socket.broadcast.emit('announcement', `${name} joined the chat.`);
    if (!dj) {
      elect(socket);
    } else {
      socket.emit('song', currentSong);
    }
  });
  // 搜索歌曲api
  socket.on('search', (q, cb) => {
    request
      .get('http://s.music.163.com/search/get/')
      .query({type: 1, limit: 5, s: q})
      .end((err, res) => {
        if (err || res.body.code === 400) {
          console.log('api get error!');
        } else {
          cb(res.body);
        }
      });
  });
  // 广播当前歌曲
  socket.on('song', (song) => {
    if(socket.dj) {
      currentSong = song;
      io.emit('song', song);
    }
  });
  // 消息
  socket.on('text', (msg, cb) => {
    socket.broadcast.emit('text', socket.nickname, msg);
    cb(Date.now());
  });

  // 添加离开事件的监听
  socket.on('disconnect', () => {
    socket.broadcast.emit('announcement', `${socket.nickname} left the chat.`);
  });
});

// 监听端口
server.listen(3000, () => {
  console.log('run at http://localhost:3000');
})