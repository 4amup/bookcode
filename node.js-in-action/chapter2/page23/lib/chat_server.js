// 初始化一些聊天状态变量
const ioserver = require('socket.io');
let io;
let guestNumber = 1;
let nickNames = {};
let namesUesd = [];
let currentRoom = {};
let rooms = []; //自建一个数组存储房间数据

module.exports = {
  listen: function (server) {
    let io = ioserver.listen(server);
    // io.set('log level', 1)
    // 书中的这个方法已经不再支持，这是配置打印日志级别的方法
    io.sockets.on('connection', function (socket) {
      // 以下为功能函数部分
      guestNumber = assignGuestName (socket, guestNumber, nickNames, namesUesd);
      joinRoom(socket, 'Lobby', io);

      handleMessageBroadcasting(socket, nickNames);
      handleNameChangeAttempts(socket, nickNames, namesUesd);
      handleRoomJoining(socket);

      socket.on('rooms', () => {
        socket.emit('rooms', io.sockets.adapter.rooms);
      });

      handleClientDisconnection(socket, nickNames, namesUesd);
    });
  }
}

// 自动分配name，并给当前客户端发送消息的函数
function assignGuestName (socket, guestNumber, nickNames, namesUesd) {
  let name = 'Guest' + guestNumber;
  nickNames[socket.id] = name;
  socket.emit('nameResult', {
    success: true,
    name: name
  });

  namesUesd.push(name);
  return guestNumber + 1;
}

// 加入房间事件函数
function joinRoom (socket, room, io) {
  socket.join(room);
  currentRoom[socket.id] = room;
  socket.emit('joinResult', {room: room});
  socket.to(room).emit('message', { // 发送给room内所有客户端
    text: `${nickNames[socket.id]} has joined ${room}.`
  });

  // 解决io无法传进来，就显式传入了io
  io.sockets.clients((err, clients) => {
    console.log(clients);
    // 房间里的userid
    let usersInRoom = clients;
    if (usersInRoom.length>1) {
      let usersInRoomSummary = `Users currently in ${room}: `;
      usersInRoom.forEach((userid, index) => {
        if(userid != socket.id) {
          if(index > 0) {
            usersInRoomSummary += ', ';
          }
          usersInRoomSummary += nickNames[userid];
        }
      })
      usersInRoomSummary += '.';
      socket.emit('message', {text: usersInRoomSummary});
    };
  });
}

// 更名请求逻辑
function handleNameChangeAttempts(socket, nickNames, namesUesd) {
  socket.on('nameAttempt', (name) => {
    if (name.indexOf('Guest') === 0) {
      socket.emit('nameResult', {
        success: false,
        message: 'Names cannot begin With "Guest".'
      });
    } else {
      if (namesUesd.indexOf(name) === -1) {
        let previousName = nickNames[socket.id];
        let previousNameIndex = namesUesd.indexOf(previousName);
        namesUesd.push(name);
        nickNames[socket.id] = name;
        delete namesUesd[previousNameIndex];
        socket.emit('nameResult', {
          success: true,
          name: name
        });
        socket.broadcast.to(currentRoom[socket.id]).emit('message', {
          text: `${previousName} is now known as ${name}.`
        });
      } else {
        socket.emit('nameResult', {
          success: false,
          message: 'That name is already in use.'
        })
      }
    }
  });
}

// 聊天消息处理逻辑
function handleMessageBroadcasting (socket) {
  socket.on('message', (message) => {
    socket.broadcast.to(message.room).emit('message', {
      text: `${nickNames[socket.id]}: ${message.text}`
    });
  });
}

// 加入已有房间的逻辑
function handleRoomJoining (socket) {
  socket.on('join', (room) => {
    socket.leave(currentRoom[socket.id]);
    joinRoom(socket, room.newRoom);
  });
}

// 用户断开连接
function handleClientDisconnection (socket) {
  socket.on('disconnect', () => {
    let nameIndex = namesUesd.indexOf(nickNames[socket.id]);
    delete namesUesd[nameIndex];
    delete nickNames[socket.id];
  })
}