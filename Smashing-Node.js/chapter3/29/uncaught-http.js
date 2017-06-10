var http = require('http');

http.createServer(function() {
  throw new Error('This will be uncaught!');
}).listen(3000);

// 以下代码用于捕获未捕获的事件
process.on('uncaughtException', function(err) {
  console.log("I'm the error handle!");
  console.error(`message: ${err}`);
  process.exit(1); //手动退出进程
});

// 未被捕获的错误会导致整个进程的崩溃
// Node这么处理的原因是，在发生未被捕获的错误时，进程的状态就是不确定的。