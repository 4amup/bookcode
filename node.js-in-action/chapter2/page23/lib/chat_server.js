// 初始化一些聊天状态变量
let io;
let guestNumber = 1;
let nickName = {};
let namesUesd = [];
let currentRoom = {};

module.exports = {
  listen: function (s) {
    let io = require('socket.io').listen(s);
    // io.set('log level', 1)
    // 书中的这个方法已经不再支持，这是配置打印日志级别的方法
    io.sockets.on('connection', function (socket) {
      console.log('服务端socket.io启动！');
      // 官网示例代码-测试部分
      socket.emit('news', { hello: 'world' });
      socket.on('my other event', function (data) {
        console.log(data);
      });
      // 以下为功能函数部分
      // guestNumber = assignGuestName (socket, guestNumber, nickName, namesUesd);
      // joinRoom(socket, 'Lobby');

      // handleMessageBroadcasting(socket, nickName);
      // handleNameChangeAttempts(socket, nickName, namesUesd);
      // handleRoomJoining(socket);

      // ioserver.on('rooms', () => {
      //   socket.emit('room', io.sockets.manager.rooms);
      // });

      // handleClientDisconnection(socket, nickName, namesUesd);
    });
  }
}