var net = require('net');

net.createServer(function(connection) {
  connection.on('error', function(err) {
    //err是一个错误对象
    console.log('我就是一个错误对象！');
  });
}).listen(400);