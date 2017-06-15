const net = require('net');
// 引入计数器，这个通常称之为状态
// 在本程序中，不同的客户端都可以修改count这个状态
// 在Node中，这种情况称为*共享状态的并发*
let count = 0,
    users = {};

// 如下的connection->net.Socket->duplex stream
// 所以connection可读可写，可使用write方法，此外它还是个EventEmitter。
// 可以使用EventEmitter的方法，如on等方法。
let server = net.createServer((connection) => {
  // 设置数据显示格式，因为connection是个Stream，可读可写
  connection.setEncoding('utf-8');
  // 'connection' listener
  connection.write(
    '\n > welcome to \033[92mnode-chat\033[39m!'
    +'\n > ' + count + ' other people are connected at this time,'
    + '\n > please write your name and press enter: '
  );
  count++;

  // 监听输入数据
  // 每个连接都设置一个昵称
  let nickname;
  // 将广播函数抽象出来
  function broadcast (msg, exceptMyself) {
    for(let key in users) {
      if(!exceptMyself || key != nickname) {
        users[key].write(msg);
      }
    }
  }
  connection.on('data', (data) => {
    // 删除输入数据中的回车符和换行符
    data = data.replace('\r\n', '');
    // 把第一次输入的内容默认作为昵称nickname
    if(!nickname) { // 如果nickname还没被赋值，则执行如下逻辑
      if(users[data]) {
        connection.write('\033[93m > 昵称已占用，请重试：\033[39m');
        return;
      } else {
        nickname = data;
        users[nickname] = connection; // connection是个net.Socket实例

        broadcast('\033[90m > ' + nickname + ' joined the room\033[39m\n');      }
    } else {
      // 其他消息默认发送给其他客户端
      if(!data) {
        connection.write('\033[93m > 您输入的内容为空，请重新输入：\033[39m');
        return;
      }
      broadcast('\033[96m > ' + nickname + ':\033[39m ' + data + '\n', true);
    }
  });

  // 关闭连接后，将count减一，并广播退出的消息
  connection.on('close', () => {
    count--;
    delete users[nickname];
    broadcast('\033[90m > ' + nickname + ' left the room\033[39m\n')
  });
});

// 监听一下
server.listen(3000, () => {
  console.log('\033[96mserver listening on *3000\033[39m');
});