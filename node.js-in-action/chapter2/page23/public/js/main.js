window.onload = function () {
  var socket = io.connect();
  socket.on('connect', function () {
    console.log('客户端socket.io已启动！');
  });
  // 官网示例代码-测试部分
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
}