const socketio = require('socket.io');

// 初始化一些聊天状态变量
let io;
let guestNumber = 1;
let nickName = {};
let namesUesd = [];
let currentRoom = {};

module.exports = {
  listen: function (server) {
    let io = socketio.listen(server);
    // io.set('log level', 1); 书中的这个方法已经不再支持
    io.sockets.on('connection', (socket) => {
      console.log('connection!')
      guestNumber = assignGuestName (socket, guestNumber, nickName, namesUesd);
      joinRoom(socket, 'Lobby');

      handleMessageBroadcasting(socket, nickName);
      handleNameChangeAttempts(socket, nickName, namesUesd);
      handleRoomJoining(socket);

      ioserver.on('rooms', () => {
        socket.emit('room', io.sockets.manager.rooms);
      });

      handleClientDisconnection(socket, nickName, namesUesd);
    });
  }
}