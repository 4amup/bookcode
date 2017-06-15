const http = require('http');
const qs = require('querystring');
// 先定义一个option选项
let option = {
  host: '127.0.0.1',
  port: 3000,
  url: '/',
  method: 'POST'
}
// 抽象了一个send函数，用于给服务器端发送数据
function send (theName) {
  // http.request()返回的是一个http.ClientRequest的实例
  let req = http.request(option, (res) => {
    res.setEncoding('utf-8');
  });

  req.write(qs.stringify({name: theName}));

  // 发送完数据后，在命令行打印提示信息
  console.log('request complete!');
  process.stdout.write('your name: ');

  // 结束这个req
  req.end();
  // 错误处理handle
  req.on('err', (err) => {
    console.log(err);
  })
  
}
// client的主体部分如下
process.stdout.write('your name: ');
process.stdin.setEncoding('utf-8');
process.stdin.on('data', (name) => {
  send(name.replace('\n', ''));
});