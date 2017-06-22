const connect = require('connect');
const static = require('serve-static');

let app = connect();

// 这个中间件可以将制定目录下的静态文件，从文件系统放到服务器上
app.use(static(__dirname + '/website'));

// 利用connect自带的API监听3000端口
app.listen(3000);

console.log('server run at http://localhost:3000');