// 初始化逻辑
var socket = io.connect();

$(document).ready(function () {
  var chatApp = new Chat(socket);
  
  socket.on('connect', function () {
    console.log('客户端逻辑已连接！');
  });

  // 监听nameresult事件
  socket.on('nameResult', function (result) {
    var message;
    if (result.success) {
      message = `You are now known as ${result.name}.`;
    } else {
      message = result.message;
    }
    $('#messages').append(divSystemContentElement(message));
  });

  socket.on('joinResult', function (result) {
    $('#room').text(result.room);
    $('#messages').append(divSystemContentElement('Room changed.'));
  });

  socket.on('message', function (message) {
    var newElement = $('<div></div>').text(message.text);
    $('#messages').append(newElement);
  });

  socket.on('rooms', function (rooms) {
    $('#room-list').empty();

    for(var room in rooms) {
      if (room != '') {
        $('#room-list').append(divEscapedContentElement(room));
      }
    }

    // 只有一个客户端的时候就有错误，修复了。
    $('#room-list div').click(function () {
      chatApp.processCommand('/join ' + $(this).text());
      $('#send-message').focus();
    });
  });

  setInterval(function () {
    socket.emit('rooms');
  }, 1000);

  $('#send-message').focus();

  $('#send-form').submit(function () {
    processUserInput(chatApp, socket);
    return false;
  })
})


// 辅助函数
// 显示不可信的文本
function divEscapedContentElement (message) {
  return $('<div></div>').text(message);
}
// 显示系统创建的受信内容
function divSystemContentElement (message) {
  return $('<div></div>').html(`<i>${message}</i>`);
}

// 处理原始的用户输入
function processUserInput (chatApp, socket) {
  var message = $('#send-message').val();
  var systemMessage;

  if (message.charAt(0) === '/') {  // 如果开始是斜杠，说明是命令
    systemMessage = chatApp.processCommand(message);
    if(systemMessage) {
      $('#messages').append(divSystemContentElement(systemMessage));
    }
  } else { // 非命令就广播给其他用户
    chatApp.sendMessage($('#room').text(), message);
    $('#messages').append(divEscapedContentElement(message));
    $('#messages').scrollTop($('#messages').prop('scrollHeight'));
  }
  $('#send-message').val('');
}