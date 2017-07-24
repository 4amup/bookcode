// 面向对象编程，将指令抽象成一个对象
var Chat = function (socket) {
  this.socket = socket;
}
// 添加发送聊天信息的函数
Chat.prototype.sendMessage = function (room, text) {
  var message = {
    room: room,
    text: text
  }
  this.socket.emit('message', message);
}
// 变更房间的函数
Chat.prototype.changeRoom = function (room) {
  this.socket.emit('join', {
    newRoom: room
  })
}
// 识别客户端的文字命令
Chat.prototype.processCommand = function (commmand) {
  var words = command.split(' ');
  var commmand = words[0].substring(1, words[0].length).toLowerCase();

  var message = false;

  switch (commmand) {
    case 'join': {
      words.shift();
      var room = words.join(' ');
      this.changeRoom(room);
      break;
    }
    case 'nick': {
      words.shift();
      var name = words.join(' ');
      this.socket.emit('nameAttempt', name);
      break;
    }
    default: {
      message: 'Unrecognized command.';
      break;
    }
  }
  return message;
}