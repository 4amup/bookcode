const socketio = require('socket.io');

// 初始化一些聊天状态变量
let io;
let guestNumber = 1;
let nickName = {};
let namesUesd = [];
let currentRoom = {};

module.exports = {
  listen: function (server) {
    io = socket.io.listen(server);
    // io.set('log level', 1); 书中的这个方法已经不再支持
  }
}